import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking, TextInput } from "react-native";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function Lawyers() {
  const lawyers = useQuery(api.lawyers.getAll);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  const specialties = ['All', 'Family Law', 'Criminal Law', 'Employment Law', 'Personal Injury', 'Immigration Law', 'Real Estate'];

  const filteredLawyers = lawyers?.filter(lawyer => {
    const matchesSearch = lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.firm?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lawyer.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSpecialty = selectedSpecialty === 'All' || 
                           lawyer.specialties.includes(selectedSpecialty);
    
    return matchesSearch && matchesSpecialty;
  });

  const handleCallPress = (phone: string) => {
    const cleanPhone = phone.replace(/[^\d-]/g, '');
    Linking.openURL(`tel:${cleanPhone}`);
  };

  const handleEmailPress = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const handleWebsitePress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Find a Lawyer</Text>
          <Text style={styles.subtitle}>
            Connect with legal professionals in Alberta
          </Text>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={theme.colors.textSecondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, firm, or specialty..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>
        </View>

        {/* Specialty Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Specialties</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
            {specialties.map((specialty) => (
              <TouchableOpacity
                key={specialty}
                style={[
                  styles.filterChip,
                  selectedSpecialty === specialty && styles.filterChipSelected
                ]}
                onPress={() => setSelectedSpecialty(specialty)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedSpecialty === specialty && styles.filterChipTextSelected
                ]}>
                  {specialty}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Lawyers List */}
        <View style={styles.lawyersSection}>
          <Text style={styles.sectionTitle}>
            {filteredLawyers?.length || 0} Lawyers Found
          </Text>
          
          {filteredLawyers?.map((lawyer) => (
            <View key={lawyer._id} style={styles.lawyerCard}>
              <View style={styles.lawyerHeader}>
                <View style={styles.lawyerInfo}>
                  <Text style={styles.lawyerName}>{lawyer.name}</Text>
                  {lawyer.firm && (
                    <Text style={styles.lawyerFirm}>{lawyer.firm}</Text>
                  )}
                  {lawyer.yearsOfExperience && (
                    <Text style={styles.lawyerExperience}>
                      {lawyer.yearsOfExperience} years experience
                    </Text>
                  )}
                </View>
                
                {lawyer.rating && (
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={16} color={theme.colors.warning} />
                    <Text style={styles.ratingText}>{lawyer.rating}</Text>
                    {lawyer.reviewCount && (
                      <Text style={styles.reviewCount}>({lawyer.reviewCount})</Text>
                    )}
                  </View>
                )}
              </View>

              <View style={styles.specialtiesContainer}>
                {lawyer.specialties.map((specialty, index) => (
                  <View key={index} style={styles.specialtyTag}>
                    <Text style={styles.specialtyText}>{specialty}</Text>
                  </View>
                ))}
              </View>

              {lawyer.acceptsLegalAid && (
                <View style={styles.legalAidBadge}>
                  <Ionicons name="checkmark-circle" size={16} color={theme.colors.success} />
                  <Text style={styles.legalAidText}>Accepts Legal Aid</Text>
                </View>
              )}

              <View style={styles.languagesContainer}>
                <Text style={styles.languagesLabel}>Languages: </Text>
                <Text style={styles.languagesText}>{lawyer.languages.join(', ')}</Text>
              </View>

              <View style={styles.contactActions}>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => handleCallPress(lawyer.phone)}
                >
                  <Ionicons name="call" size={18} color={theme.colors.primary} />
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
                
                {lawyer.email && (
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleEmailPress(lawyer.email!)}
                  >
                    <Ionicons name="mail" size={18} color={theme.colors.primary} />
                    <Text style={styles.contactButtonText}>Email</Text>
                  </TouchableOpacity>
                )}
                
                {lawyer.website && (
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleWebsitePress(lawyer.website!)}
                  >
                    <Ionicons name="globe" size={18} color={theme.colors.primary} />
                    <Text style={styles.contactButtonText}>Website</Text>
                  </TouchableOpacity>
                )}
              </View>

              {lawyer.address && (
                <View style={styles.addressContainer}>
                  <Ionicons name="location" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.addressText}>{lawyer.address}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Always verify credentials and fees before hiring a lawyer.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.sm,
  },
  backButton: {
    marginBottom: theme.spacing.md,
  },
  title: {
    fontSize: theme.fontSize.xxxl,
    fontWeight: theme.fontWeight.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  searchSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.lg,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: theme.spacing.sm,
    fontSize: theme.fontSize.md,
    color: theme.colors.text,
  },
  filterSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  filterTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  filterScrollView: {
    flexDirection: 'row',
  },
  filterChip: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.xl,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  filterChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  filterChipText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    fontWeight: theme.fontWeight.medium,
  },
  filterChipTextSelected: {
    color: theme.colors.white,
  },
  lawyersSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  lawyerCard: {
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    marginBottom: theme.spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  lawyerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  lawyerInfo: {
    flex: 1,
  },
  lawyerName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  lawyerFirm: {
    fontSize: theme.fontSize.md,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
  },
  lawyerExperience: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },
  reviewCount: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.sm,
  },
  specialtyTag: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  specialtyText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  legalAidBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  legalAidText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.success,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },
  languagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  languagesLabel: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeight.medium,
  },
  languagesText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    flex: 1,
  },
  contactActions: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.primary,
  },
  contactButtonText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary,
    marginLeft: theme.spacing.xs,
    fontWeight: theme.fontWeight.medium,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.xs,
    flex: 1,
  },
  footer: {
    padding: theme.spacing.lg,
    alignItems: 'center',
  },
  footerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});