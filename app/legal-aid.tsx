import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Linking } from "react-native";
import { theme } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function LegalAid() {
  const legalAidServices = useQuery(api.legalAidServices.getAll);
  const [selectedServiceType, setSelectedServiceType] = useState('All');

  const serviceTypes = ['All', 'clinic', 'hotline', 'program'];

  const filteredServices = legalAidServices?.filter(service => {
    return selectedServiceType === 'All' || service.serviceType === selectedServiceType;
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

  const getServiceTypeIcon = (serviceType: string) => {
    switch (serviceType) {
      case 'clinic': return 'medical';
      case 'hotline': return 'call';
      case 'program': return 'school';
      default: return 'help-circle';
    }
  };

  const getServiceTypeColor = (serviceType: string) => {
    switch (serviceType) {
      case 'clinic': return theme.colors.primary;
      case 'hotline': return theme.colors.warning;
      case 'program': return theme.colors.success;
      default: return theme.colors.textSecondary;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
          </TouchableOpacity>
          <Text style={styles.title}>Legal Aid Services</Text>
          <Text style={styles.subtitle}>
            Free and low-cost legal services for qualifying individuals
          </Text>
        </View>

        {/* Info Banner */}
        <View style={styles.infoBanner}>
          <Ionicons name="information-circle" size={24} color={theme.colors.primary} />
          <Text style={styles.infoBannerText}>
            Legal aid services are available for people who cannot afford a lawyer. 
            Income and asset guidelines may apply.
          </Text>
        </View>

        {/* Service Type Filter */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Service Type</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScrollView}>
            {serviceTypes.map((serviceType) => (
              <TouchableOpacity
                key={serviceType}
                style={[
                  styles.filterChip,
                  selectedServiceType === serviceType && styles.filterChipSelected
                ]}
                onPress={() => setSelectedServiceType(serviceType)}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedServiceType === serviceType && styles.filterChipTextSelected
                ]}>
                  {serviceType === 'All' ? 'All Services' : serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Services List */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>
            {filteredServices?.length || 0} Services Available
          </Text>
          
          {filteredServices?.map((service) => (
            <View key={service._id} style={styles.serviceCard}>
              <View style={styles.serviceHeader}>
                <View style={[styles.serviceTypeIcon, { backgroundColor: getServiceTypeColor(service.serviceType) }]}>
                  <Ionicons 
                    name={getServiceTypeIcon(service.serviceType)} 
                    size={20} 
                    color="white" 
                  />
                </View>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceType}>
                    {service.serviceType.charAt(0).toUpperCase() + service.serviceType.slice(1)}
                  </Text>
                </View>
              </View>

              <Text style={styles.serviceDescription}>{service.description}</Text>

              {/* Areas of Law */}
              <View style={styles.areasContainer}>
                <Text style={styles.areasLabel}>Areas of Law:</Text>
                <View style={styles.areasGrid}>
                  {service.areasOfLaw.map((area, index) => (
                    <View key={index} style={styles.areaTag}>
                      <Text style={styles.areaText}>{area}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Service Details */}
              <View style={styles.detailsContainer}>
                {service.hoursOfOperation && (
                  <View style={styles.detailItem}>
                    <Ionicons name="time" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.detailText}>{service.hoursOfOperation}</Text>
                  </View>
                )}
                
                {service.languages && service.languages.length > 0 && (
                  <View style={styles.detailItem}>
                    <Ionicons name="language" size={16} color={theme.colors.textSecondary} />
                    <Text style={styles.detailText}>Languages: {service.languages.join(', ')}</Text>
                  </View>
                )}
                
                <View style={styles.detailItem}>
                  <Ionicons 
                    name={service.isWalkInAvailable ? "checkmark-circle" : "close-circle"} 
                    size={16} 
                    color={service.isWalkInAvailable ? theme.colors.success : theme.colors.textSecondary} 
                  />
                  <Text style={styles.detailText}>
                    Walk-in {service.isWalkInAvailable ? 'available' : 'not available'}
                  </Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Ionicons 
                    name={service.appointmentRequired ? "calendar" : "calendar-outline"} 
                    size={16} 
                    color={service.appointmentRequired ? theme.colors.warning : theme.colors.textSecondary} 
                  />
                  <Text style={styles.detailText}>
                    Appointment {service.appointmentRequired ? 'required' : 'not required'}
                  </Text>
                </View>
              </View>

              {/* Eligibility */}
              {service.eligibilityRequirements && (
                <View style={styles.eligibilityContainer}>
                  <Text style={styles.eligibilityLabel}>Eligibility:</Text>
                  <Text style={styles.eligibilityText}>{service.eligibilityRequirements}</Text>
                </View>
              )}

              {/* Contact Actions */}
              <View style={styles.contactActions}>
                <TouchableOpacity 
                  style={styles.contactButton}
                  onPress={() => handleCallPress(service.phone)}
                >
                  <Ionicons name="call" size={18} color={theme.colors.primary} />
                  <Text style={styles.contactButtonText}>Call</Text>
                </TouchableOpacity>
                
                {service.email && (
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleEmailPress(service.email!)}
                  >
                    <Ionicons name="mail" size={18} color={theme.colors.primary} />
                    <Text style={styles.contactButtonText}>Email</Text>
                  </TouchableOpacity>
                )}
                
                {service.website && (
                  <TouchableOpacity 
                    style={styles.contactButton}
                    onPress={() => handleWebsitePress(service.website!)}
                  >
                    <Ionicons name="globe" size={18} color={theme.colors.primary} />
                    <Text style={styles.contactButtonText}>Website</Text>
                  </TouchableOpacity>
                )}
              </View>

              {/* Address */}
              {service.address && (
                <View style={styles.addressContainer}>
                  <Ionicons name="location" size={16} color={theme.colors.textSecondary} />
                  <Text style={styles.addressText}>{service.address}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Contact services directly to confirm eligibility requirements and current availability.
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.white,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  infoBannerText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.text,
    lineHeight: 20,
    marginLeft: theme.spacing.sm,
    flex: 1,
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
  servicesSection: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  serviceCard: {
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
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  serviceTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: theme.fontSize.lg,
    fontWeight: theme.fontWeight.semibold,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  serviceType: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    textTransform: 'capitalize',
  },
  serviceDescription: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  areasContainer: {
    marginBottom: theme.spacing.md,
  },
  areasLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  areasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  areaTag: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  areaText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.primary,
    fontWeight: theme.fontWeight.medium,
  },
  detailsContainer: {
    marginBottom: theme.spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  detailText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    marginLeft: theme.spacing.sm,
    flex: 1,
  },
  eligibilityContainer: {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.md,
  },
  eligibilityLabel: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  eligibilityText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.textSecondary,
    lineHeight: 18,
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