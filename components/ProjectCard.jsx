import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ProjectCard = ({ project }) => (
  <View style={styles.card}>
    <Image source={{ uri: project.images[0] }} style={styles.image} />
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{project.title}</Text>
      <View style={styles.cardInfo}>
        <View style={styles.infoRow}>
          <MaterialIcons name="location-on" size={16} color="#6B7280" />
          <Text style={styles.infoText}>{project.location}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="area-chart" size={16} color="#6B7280" />
          <Text style={styles.infoText}>{project.area}</Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="calendar-today" size={16} color="#6B7280" />
          <Text style={styles.infoText}>Planted: {project.planted}</Text>
        </View>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: { marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, overflow: 'hidden', backgroundColor: 'white' },
  image: { width: '100%', height: 180, resizeMode: 'cover' },
  cardContent: { padding: 16 },
  cardTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  cardInfo: { gap: 8 },
  infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  infoText: { fontSize: 14, color: '#374151' },
});

export default ProjectCard;
