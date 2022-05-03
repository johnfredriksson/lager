import { render } from '@testing-library/react-native';
import Stock from '../components/Stock';

jest.useFakeTimers();
jest.mock("../components/StockList", () => "StockList");

test('header should exist containing text Lager', async () => {
    const { getByText } = render(<Stock />);
    const header = await getByText('Lager');

    expect(header).toBeDefined();
});