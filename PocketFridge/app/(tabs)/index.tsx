import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';
import { useEffect } from 'react';
import { useFridge } from '../../contexts/FridgeContext'; // <--- Import the Brain hook

export default function FridgeScreen() {
  // ACCESS THE BRAIN using helper
  const { fridgeItems, receipts, getTotalSpending } = useFridge();

  useEffect(() => {
    console.log("BRAIN UPDATE:");
    console.log("--------------------------------");
    console.log(`Items in Fridge: ${fridgeItems.length}`);
    console.log("Current Inventory:", JSON.stringify(fridgeItems, null, 2));
    console.log("Receipt History:", JSON.stringify(receipts, null, 2));
    console.log(`Total Spent: $${getTotalSpending()}`);
    console.log("--------------------------------");
  }, [fridgeItems, receipts]); // <--- Runs every time these change

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Fridge ❄️</Text>
      
      <Text style={styles.stat}>Total Items: {fridgeItems.length}</Text>
      <Text style={styles.stat}>Total Value: ${getTotalSpending().toFixed(2)}</Text>

      {/* 3. VISUAL CHECK: List the items on screen */}
      {fridgeItems.length === 0 ? (
        <Text style={styles.emptyText}>Fridge is empty! Scan a receipt.</Text>
      ) : (
        <FlatList
          data={fridgeItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.icon}>{item.icon_name ? "🍎" : "📦"}</Text> 
              <View>
                <Text style={styles.name}>{item.food_type}</Text>
                <Text style={styles.details}>
                  Qty: {item.quantity} | Expires: {item.date_expiring || "N/A"}
                </Text>
              </View>
              <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  stat: { fontSize: 16, color: 'gray', marginBottom: 5 },
  emptyText: { marginTop: 50, textAlign: 'center', fontSize: 18, color: '#aaa' },
  
  itemRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 15, 
    borderBottomWidth: 1, 
    borderColor: '#eee' 
  },
  icon: { fontSize: 24, marginRight: 15 },
  name: { fontSize: 18, fontWeight: '600' },
  details: { color: 'gray', fontSize: 12 },
  price: { marginLeft: 'auto', fontSize: 16, fontWeight: 'bold', color: 'green' }
});