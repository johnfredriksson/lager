import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';
import StockList from './StockList';
import { Typography } from '../styles';

export default function Stock({products, setProducts}) {
  return (
    <View>
      <Text style={ Typography.header2 }>Lager</Text>
      <DataTable>
            <DataTable.Header>
                <DataTable.Title>Artnr</DataTable.Title>
                <DataTable.Title >Namn</DataTable.Title>
                <DataTable.Title numeric>Antal</DataTable.Title>
            </DataTable.Header>
        </DataTable>
      <StockList products={products} setProducts={setProducts}/>
    </View>
  );
}