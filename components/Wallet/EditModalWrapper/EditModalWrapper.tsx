import { toastRef } from '@/components/Toast/Toast';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useCards } from '@/react-query/useCards';
import { router } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
interface Props {
  selectedCard?: any
  onClose: () => void
}

const EditModalWrapper: React.FC<Props> = ({ selectedCard, onClose }) => {
  const { deleteCard } = useCards();
  const handleEdit = () => {
    onClose()
    router.push({
      pathname: '/modal-edit-screen',
      params: {
        ...selectedCard
      }
    });
  };

  const handleDelete = async () => {
    deleteCard(selectedCard?.timestamp, {
      onSuccess: () => {
        toastRef.current('successfully deleted');
      },
      onError: () => {
        toastRef.current('Sorry unsuccessfully');
      }
    })
    onClose()
  }

  return (
    <View >

      <View style={styles.sheetContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Card name: {selectedCard?.name}</Text>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <IconSymbol size={24} color="#FFFFFF" name="xmark.circle.fill" />
          </TouchableOpacity>

        </View>

        <View style={styles.content}>
          {selectedCard && (
            <>
              <Text style={styles.cardInfo}>Type: {selectedCard?.type}</Text>
              <Text style={styles.cardInfo}>Code: {selectedCard?.data}</Text>
            </>
          )}
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.buttonBase, styles.outlinedButton]}
          onPress={() => handleEdit()}
          disabled={!selectedCard}
        >
          <Text style={[styles.buttonTextBase, styles.outlinedButtonText]}>
            Edit
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonBase, styles.solidButton]}
          onPress={handleDelete}
          disabled={!selectedCard}
        >
          <Text style={[styles.buttonTextBase, styles.solidButtonText]}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  )
}

export default EditModalWrapper

const styles = StyleSheet.create({
  sheetContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111',
  },
  actions: {
    gap: 10,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  content: {
    gap: 8,
  },
  cardInfo: {
    fontSize: 16,
    color: '#333',
  },
  buttonBase: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  buttonTextBase: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  solidButton: {
    backgroundColor: '#000',
  },
  solidButtonText: {
    color: '#fff',
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#000',
  },
  outlinedButtonText: {
    color: '#000',
  },

  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.29)',
    borderRadius: 45,
  },
})