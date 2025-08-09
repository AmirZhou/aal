import { Ionicons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import { Stack, router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

// ---- Simple theme fallback (uses your theme.ts if you import it) ----
const C = {
  bg: "#F5F7FA",
  card: "#FFFFFF",
  text: "#111827",
  textDim: "#6B7280",
  primary: "#2E7CF6",
  stroke: "#E5E7EB",
  danger: "#EF4444",
  radius: 14,
  space: { xs: 4, sm: 8, md: 12, lg: 16, xl: 24 },
  fs: { sm: 13, md: 15, lg: 18, xl: 22, xxl: 28, xxxl: 32 },
};

// -------------------- Quiz model --------------------
type Option = { id: string; label: string; value: string };
type Question = { id: string; title: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "q1",
    title: "What are you facing?",
    options: [
      { id: "landlord", label: "Landlord issue", value: "landlord" },
      { id: "family", label: "Family matter", value: "family" },
      { id: "job", label: "Job conflict", value: "job" },
      { id: "consumer", label: "Consumer dispute", value: "consumer" },
      { id: "other", label: "Other", value: "other" },
    ],
  },
  {
    id: "q2",
    title: "How urgent is it?",
    options: [
      { id: "emergency", label: "Emergency / immediate risk", value: "urgent" },
      { id: "soon", label: "Soon (within days/weeks)", value: "soon" },
      { id: "explore", label: "Just exploring options", value: "explore" },
    ],
  },
  {
    id: "q3",
    title: "Share location to find nearby help?",
    options: [
      { id: "loc_yes", label: "Yes, use my location", value: "loc_yes" },
      { id: "loc_no", label: "No, show province-wide", value: "loc_no" },
    ],
  },
];

// Route constants as typed Hrefs
const ROUTES = {
  emergency: "/emergency" as const,
  legalAid: "/legal-aid" as const,
  lawyers: "/lawyers" as const,
};

type Result = {
  summary: string;
  bullets: string[];
  primaryHref: Href;
  primaryCta: string;
  secondaryHref: Href;
  secondaryCta: string;
};

// -------------------- Screen --------------------
export default function QuizScreen() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);

  const current = QUESTIONS[step];
  const selected = current ? answers[current.id] : undefined;

  const progress = useMemo(
    () => `${Math.min(step + 1, QUESTIONS.length)}/${QUESTIONS.length}`,
    [step]
  );

  const select = (qId: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [qId]: value }));

  const next = () => {
    if (step < QUESTIONS.length - 1) setStep((s) => s + 1);
    else setShowResult(true);
  };
  const back = () => (step > 0 ? setStep((s) => s - 1) : router.back());

  const result = useMemo<Result>(() => makeResult(answers), [answers]);

  return (
    <SafeAreaView style={s.safe}>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={s.headerRow}>
        <Pressable onPress={back} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} />
        </Pressable>
        <Text style={s.headerTitle}>Legal Quiz</Text>
        <View style={{ width: 24 }} />
      </View>

      {!showResult ? (
        <ScrollView style={s.scroll} contentContainerStyle={s.content}>
          <Text style={s.hero}>Let’s find the right legal path for you</Text>
          <Text style={s.sub}>
            Answer a few questions to help us understand your situation and guide
            you to the right resources.
          </Text>

          <Text style={s.progress}>Question {progress}</Text>
          <Text style={s.qTitle}>{current.title}</Text>

          <View style={{ gap: 12 }}>
            {current.options.map((opt) => (
              <RadioCard
                key={opt.id}
                label={opt.label}
                selected={selected === opt.value}
                onPress={() => select(current.id, opt.value)}
              />
            ))}
          </View>

          <View style={s.ctrRow}>
            <Pressable style={[s.ghostBtn]} onPress={back}>
              <Text style={s.ghostTxt}>Back</Text>
            </Pressable>

            <Pressable
              style={[s.ctaBtn, !selected && { opacity: 0.6 }]}
              disabled={!selected}
              onPress={next}
            >
              <Text style={s.ctaTxt}>
                {step === QUESTIONS.length - 1 ? "Show my results" : "Next"}
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={s.scroll} contentContainerStyle={s.content}>
          <Text style={s.hero}>Suggested next steps</Text>
          <Text style={s.sub}>{result.summary}</Text>

          <View style={{ gap: 10, marginTop: 10 }}>
            {result.bullets.map((b, i) => (
              <View key={i} style={s.bulletRow}>
                <Ionicons name="checkmark-circle" size={18} color={C.primary} />
                <Text style={s.bulletTxt}>{b}</Text>
              </View>
            ))}
          </View>

          <View style={{ height: 16 }} />

          <Pressable style={s.primaryBtn} onPress={() => router.push(result.primaryHref)}>
            <Text style={s.primaryTxt}>{result.primaryCta}</Text>
          </Pressable>

          <View style={{ height: 8 }} />

          <Pressable style={s.secondaryBtn} onPress={() => router.push(result.secondaryHref)}>
            <Text style={s.secondaryTxt}>{result.secondaryCta}</Text>
          </Pressable>

          <View style={{ height: 16 }} />

          <Pressable style={s.ghostBtn} onPress={() => setShowResult(false)}>
            <Text style={s.ghostTxt}>Retake quiz</Text>
          </Pressable>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// -------------------- UI bits --------------------
function RadioCard({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[s.card, selected && { borderColor: C.primary }]}>
      <View style={s.radioOuter}>{selected ? <View style={s.radioInner} /> : null}</View>
      <Text style={s.cardLabel}>{label}</Text>
    </Pressable>
  );
}

// -------------------- Result logic --------------------
function makeResult(a: Record<string, string>): Result {
  const topic = a["q1"];
  const urgency = a["q2"];
  const wantsLocation = a["q3"] === "loc_yes";

  let summary =
    "Based on your answers, here are resources and next steps to get help.";
  const bullets: string[] = [];

  // typed defaults
  let primaryHref: Href = ROUTES.legalAid;
  let primaryCta = "Contact Legal Aid Alberta";
  let secondaryHref: Href = ROUTES.lawyers;
  let secondaryCta = "Find a Lawyer";

  if (urgency === "urgent") {
    bullets.push(
      "If safety is at risk, call 911 immediately.",
      "Use our Emergency Help page for 24/7 services."
    );
    primaryHref = ROUTES.emergency;
    primaryCta = "Open Emergency Help";
  }

  switch (topic) {
    case "landlord":
      bullets.push(
        "Your issue may fall under the Residential Tenancies Act.",
        "The RTDRS (Residential Tenancy Dispute Resolution Service) may help."
      );
      break;
    case "family":
      bullets.push("Family matters may qualify for Legal Aid support.");
      break;
    case "job":
      bullets.push("Employment Standards or Human Rights may apply.");
      break;
    case "consumer":
      bullets.push("Consider provincial Consumer Protection resources.");
      break;
    default:
      bullets.push("General legal guidance and directory are available.");
  }

  bullets.push(
    wantsLocation
      ? "We’ll prioritize nearby services based on your location."
      : "Showing province-wide options."
  );

  return {
    summary,
    bullets,
    primaryHref,
    primaryCta,
    secondaryHref,
    secondaryCta,
  };
}

// -------------------- Styles --------------------
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  headerRow: {
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  headerTitle: { fontSize: 18, fontWeight: "700" },

  scroll: { flex: 1 },
  content: { padding: C.space.lg, gap: 12 },

  hero: {
    fontSize: C.fs.xxxl,
    fontWeight: "700",
    color: C.text,
    lineHeight: 36,
  },
  sub: { fontSize: C.fs.md, color: C.textDim, lineHeight: 22 },

  progress: {
    marginTop: C.space.md,
    fontSize: C.fs.lg,
    fontWeight: "700",
    color: C.text,
  },
  qTitle: {
    fontSize: C.fs.xl,
    fontWeight: "700",
    color: C.text,
    marginBottom: C.space.sm,
  },

  card: {
    backgroundColor: C.card,
    borderRadius: C.radius,
    padding: C.space.lg,
    borderWidth: 1,
    borderColor: C.stroke,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardLabel: { fontSize: C.fs.lg, color: C.text, fontWeight: "600" },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: C.primary,
  },

  ctrRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: C.space.lg,
  },
  ctaBtn: {
    flex: 1,
    backgroundColor: C.primary,
    borderRadius: C.radius,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  ctaTxt: { color: "#fff", fontWeight: "700", fontSize: C.fs.md },

  ghostBtn: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: C.radius,
    borderWidth: 1,
    borderColor: C.stroke,
    backgroundColor: "#ffffff",
  },
  ghostTxt: { color: C.text, fontWeight: "600" },

  bulletRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  bulletTxt: { color: C.text, fontSize: C.fs.md },

  primaryBtn: {
    backgroundColor: C.primary,
    borderRadius: C.radius,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  primaryTxt: { color: "#fff", fontWeight: "700" },

  secondaryBtn: {
    backgroundColor: "#EFF6FF",
    borderRadius: C.radius,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
  },
  secondaryTxt: { color: C.primary, fontWeight: "700" },
});
