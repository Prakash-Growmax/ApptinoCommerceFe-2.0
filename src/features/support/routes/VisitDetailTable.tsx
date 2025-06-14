import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const VisitDetailTable=()=>{
    const invoices = [
  {
    PartName:"Temporary Belt Clamp",
    Quantity:1,
    Unit:"Piece",
    
  },{
     PartName:"Lubricant",
    Quantity:0.5,
    Unit:"Liter",
    
  },
  
]
    return(
            <Table>
    
      <TableHeader>
        <TableRow>
          <TableHead>PartName</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Unit</TableHead>
          
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.PartName}>
            <TableCell className="font-medium">{invoice.PartName}</TableCell>
            <TableCell >{invoice.Quantity}</TableCell>
            <TableCell>{invoice.Unit}</TableCell>
          
          </TableRow>
        ))}
      </TableBody>
    
    </Table>
    )

}
export default VisitDetailTable;