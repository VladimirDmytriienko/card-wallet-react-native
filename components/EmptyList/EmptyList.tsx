import { IconSymbol } from '@/components/ui/IconSymbol';
import { useThemeColor } from '@/hooks/useThemeColor';
import { Link } from 'expo-router';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const EmptyList = () => {
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const background = useThemeColor({}, 'glass');

  return (
    <View style={styles.emptyWrapper}>
      <Link href="/modal-scanner" asChild>
        <TouchableOpacity style={styles.iconWrapper}>
          <IconSymbol size={48} name="plus.app" color={tintColor} />
        </TouchableOpacity>
      </Link>

      <Text style={[styles.emptyText, { color: textColor }]}>
        There is no code to display
      </Text>

      <Link href="/modal-scanner" asChild>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: background }]}>
          <Text style={[styles.addButtonText, { color: textColor }]}>
            Add a new card
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  emptyWrapper: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 24,
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
