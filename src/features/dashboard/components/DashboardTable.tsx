import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card"
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
//    TableFooter,
    TableBody,
    TableCell
} from "@/components/ui/table"

const TopProductsTable = () => {

    const invoices = [
    {
    invoice: "FG100145",
    totalAmount: "$ 250.00",
    },
    {
    invoice: "FG100145",
    totalAmount: "$ 150.00",
    },
    {
    invoice: "FG100145",
    totalAmount: "$ 350.00",
    },
]
return (
    <Card className="rounded-md shadow-sm w-full max-w-xl mx-6">
        <CardHeader className="">
        <CardTitle className="text-base font-bold uppercase tracking-wide ">
            Top 10 Customers
        </CardTitle>
        </CardHeader>
        <CardContent className="px-2">
        <Table>
            <TableHeader className="">
            <TableRow>
                <TableHead className="font-semibold text-sm px-4 ">Product ID</TableHead>
                <TableHead className="text-right font-semibold text-sm px-4">Amount</TableHead>
            </TableRow>
            </TableHeader>
        <TableBody>
            {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                <TableCell className="font-medium px-4">{invoice.invoice}</TableCell>
                <TableCell className="text-right px-4">{invoice.totalAmount}</TableCell>
                </TableRow>
            ))}
        </TableBody>

        {/* <TableFooter>
        <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
        </CardContent>
    </Card>
)
}

export default TopProductsTable
