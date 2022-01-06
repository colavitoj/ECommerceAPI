import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../app/store/configureStore";

export default function CartSummary() {

    const { cart } = useAppSelector(state => state.cart)
    
    

    const subtotal = cart?.items.map(x => 
        x.quantity * x.price
       
    ).reduce((a, b) => a + b, 0)

    var deliveryFee: number = 0

    if ((subtotal! / 100) > 100) {

       deliveryFee = 0
    }

        else {

        let totalQuantity = cart?.items.map(x => x.quantity).reduce((a, b) => a + b, 0)
        deliveryFee = (totalQuantity! * 5)
        }

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">${subtotal! / 100}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">${deliveryFee!}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell align="right">${(subtotal! / 100) + deliveryFee!}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            
        </>

    )
}