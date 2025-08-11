import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import * as Haptics from "expo-haptics"; // optional

type Role = "assistant" | "user";

type Message = {
  id: string;
  role: Role;
  text: string;
  time?: string;
};

export default function AILegalAssistantScreen() {
  const inset = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m0",
      role: "assistant",
      text:
        "Hello! I’m here to help with general legal questions and point you to resources. " +
        "How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<FlatList<Message>>(null);

  const canSend = input.trim().length > 0 && !sending;

  const scrollToEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToEnd({ animated: true });
    });
  }, []);

  const handleSend = useCallback(async () => {
    if (!canSend) return;
    const text = input.trim();

    // Haptics.selectionAsync().catch(() => {});
    setInput("");
    setSending(true);

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    scrollToEnd();

    try {
      // ---- Replace this stub with real backend later ----
      const reply = await mockAskAssistant(text);
      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: reply,
      };
      setMessages((prev) => [...prev, botMsg]);
      scrollToEnd();
    } catch (e) {
      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        text:
          "Sorry—something went wrong while fetching an answer. Please try again.",
      };
      setMessages((prev) => [...prev, botMsg]);
      scrollToEnd();
    } finally {
      setSending(false);
    }
  }, [canSend, input, scrollToEnd]);

  const renderItem = useCallback(({ item }: { item: Message }) => {
    const isUser = item.role === "user";
    return (
      <View
        style={[
          styles.row,
          { justifyContent: isUser ? "flex-end" : "flex-start" },
        ]}
      >
        <View
          style={[
            styles.bubble,
            isUser ? styles.bubbleUser : styles.bubbleAssistant,
          ]}
        >
          <Text style={isUser ? styles.textUser : styles.textAssistant}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((m: Message) => m.id, []);

  return (
    <SafeAreaView style={[styles.safe, { paddingTop: inset.top }]}>
      <View style={styles.header}>
        <Pressable
          onPress={() => history.back?.()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          hitSlop={10}
        >
          <Ionicons name="chevron-back" size={24} />
        </Pressable>
        <Text style={styles.headerTitle}>AI Legal Assistant</Text>
        <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.flex}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
        />

        <View style={[styles.inputBar, { paddingBottom: inset.bottom || 8 }]}>
          <Pressable style={styles.iconBtn} onPress={() => {}}>
            <Ionicons name="mic-outline" size={20} />
          </Pressable>

          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Type your message…"
            style={styles.input}
            multiline
            maxLength={2000}
          />

          <Pressable
            style={[styles.sendBtn, !canSend && { opacity: 0.6 }]}
            onPress={handleSend}
            disabled={!canSend}
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            {sending ? (
              <ActivityIndicator />
            ) : (
              <Ionicons name="send" size={18} />
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/** ------- Replace this with your real API later (Convex/Edge/Azure etc.) ------- */
async function mockAskAssistant(userText: string): Promise<string> {
  // Simulate thinking time
  await new Promise((r) => setTimeout(r, 600));
  // Very basic canned guidance
  const lower = userText.toLowerCase();
  if (lower.includes("landlord") || lower.includes("tenant")) {
    return "For landlord/tenant matters, consider the Residential Tenancies Act resources and call the Residential Tenancy Dispute Resolution Service (RTDRS). I can show nearby options if you enable location.";
  }
  if (lower.includes("family")) {
    return "For family matters, Legal Aid Alberta and Calgary Legal Guidance may help. If it’s urgent (safety), use Emergency Help from the app’s tab bar.";
  }
  if (lower.includes("job") || lower.includes("work") || lower.includes("employer")) {
    return "Workplace issues may fall under Employment Standards or Human Rights. You can start with the Alberta Employment Standards contact line.";
  }
  return "I can provide general guidance and resources. For specific legal advice, please contact a lawyer or Legal Aid Alberta. What city are you in?";
}
/** --------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F5F7FA" },
  flex: { flex: 1 },
  header: {
    height: 48,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "space-between",
    backgroundColor: "#F5F7FA",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 12,
    gap: 10,
  },
  row: { flexDirection: "row", width: "100%" },
  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  bubbleUser: {
    backgroundColor: "#2E7CF6",
    borderTopRightRadius: 4,
  },
  bubbleAssistant: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#E3E8EF",
  },
  textUser: { color: "#FFFFFF", fontSize: 15, lineHeight: 20 },
  textAssistant: { color: "#1F2937", fontSize: 15, lineHeight: 20 },
  inputBar: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
    paddingHorizontal: 12,
    paddingTop: 8,
    backgroundColor: "#FFFFFF",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E3E8EF",
  },
  iconBtn: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
  },
  sendBtn: {
    height: 40,
    width: 40,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E6EEFf",
  },
});