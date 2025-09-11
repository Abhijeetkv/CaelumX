import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';

// --- Main App Styles ---
const styles = StyleSheet.create({
    // General App
    container: { flex: 1, backgroundColor: COLORS.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
    wallet: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 },
    walletText: { fontSize: 14, fontWeight: '600', color: '#1F2937', marginLeft: 6 },
    main: { flex: 1, paddingHorizontal: 16, paddingTop: 8 },
    title: { fontSize: 28, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
    footer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#E5E7EB', backgroundColor: 'white' },
    footerItem: { alignItems: 'center', gap: 4 },
    footerText: { fontSize: 12, fontWeight: '500', color: '#6B7280' },
    footerTextActive: { fontSize: 12, fontWeight: '600', color: '#1E88E5' },
    
    // Project List
    searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 12, paddingHorizontal: 12, marginVertical: 16, borderWidth: 1, borderColor: '#E5E7EB', gap: 8 },
    searchInput: { flex: 1, height: 44, fontSize: 16, color: '#111827' },
    card: { marginBottom: 24, borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 16, overflow: 'hidden', backgroundColor: 'white', shadowColor: '#1F2937', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5 },
    image: { width: '100%', height: 180, resizeMode: 'cover' },
    cardContent: { padding: 16 },
    cardTitle: { fontSize: 20, fontWeight: 'bold', color: '#111827', marginBottom: 12 },
    cardInfo: { gap: 8 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    infoText: { fontSize: 14, color: '#374151' },
    
    // Forms (General)
    formContainer: { flex: 1, backgroundColor: "#fff" },
    formHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderColor: '#e2e8f0' },
    formHeaderTitle: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '700', color: '#1e293b' },
    formBody: { flexGrow: 1, padding: 16, gap: 16 },
    field: { gap: 6 },
    label: { fontSize: 14, fontWeight: '500', color: '#334155' },
    input: { backgroundColor: '#f8fafc', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12, fontSize: 16, color: '#1e293b', justifyContent: 'center', minHeight: 48 },
    inputWrapper: { position: 'relative', justifyContent: 'center' },
    iconRight: { position: 'absolute', right: 12 },
    dropdown: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, backgroundColor: '#f8fafc' },
    formFooter: { padding: 16, borderTopWidth: 1, borderColor: '#e2e8f0', backgroundColor: '#fff' },
    button: { backgroundColor: '#1E88E5', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
    buttonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

    // Image Upload Screen
    subtitle: { fontSize: 14, color: "gray", textAlign: "center", marginBottom: 16 },
    uploadBox: { borderWidth: 1, borderColor: "#ccc", borderStyle: "dashed", borderRadius: 12, padding: 20, alignItems: "center", marginBottom: 16 },
    iconCircle: { backgroundColor: "#E3F2FD", borderRadius: 50, padding: 12, marginBottom: 8 },
    uploadTitle: { fontSize: 16, fontWeight: "600" },
    uploadSubtitle: { fontSize: 12, color: "gray" },
    previewTitle: { fontSize: 16, fontWeight: "700", marginVertical: 12 },
    imageWrapper: { flex: 1, margin: 4, position: "relative" },
    previewImage: { width: "100%", aspectRatio: 1, borderRadius: 10 },
    removeBtn: { position: "absolute", top: 6, right: 6, backgroundColor: "rgba(0,0,0,0.6)", borderRadius: 12, padding: 4 },
    submitBtn: { backgroundColor: "#43A047", padding: 14, borderRadius: 8, alignItems: "center" },
    submitText: { color: "white", fontWeight: "700", fontSize: 16 },
});

// --- Styles for the new Profile Screen Component ---
const profileStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
    },
    content: {
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 24,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatar: {
        width: 128,
        height: 128,
        borderRadius: 128 / 2,
        marginBottom: 12,
        borderWidth: 4,
        borderColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 4,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    infoText: {
        color: '#6B7280',
        fontSize: 14,
        marginLeft: 4,
    },
    walletCard: {
        width: '100%',
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        padding: 16,
        marginBottom: 24,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#111827',
        marginBottom: 12,
    },
    walletRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    walletIcon: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },
    walletTextContainer: {
        flex: 1,
    },
    walletLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#111827',
    },
    walletValue: {
        fontSize: 14,
        color: '#6B7280',
    },
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        marginVertical: 16,
    },
    carbonCredits: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#43A047',
    },
    footer: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    footerItem: {
        alignItems: 'center',
        padding: 8,
    },
    footerText: {
        fontSize: 12,
        fontWeight: '500',
        color: '#6B7280',
        marginTop: 2,
    },
});