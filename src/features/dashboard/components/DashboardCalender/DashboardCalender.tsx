import { Button } from "@/components/ui/button"
import { CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
const FormSchema = z.object({
    startDate: z.date
    ({
        required_error: "Start date is required.",
    }),
    endDate: z.date
    ({
        required_error: "End date is required.",
    }),
})

export default function CalendarForm() {
    const [openStart, setOpenStart] = useState(false)
    const [openEnd, setOpenEnd] = useState(false)

const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
        defaultValues:
        {
            startDate: undefined,
            endDate: undefined,
        },
})



    return (
    <div className="flex justify-between mx-7">
    <div>
        <CardHeader>
        <CardTitle className="text-xl font-bold uppercase tracking-wide w-[200px] mt-3 ">
            <span className="text-2xl ">D</span>ashboard
        </CardTitle>
        </CardHeader>
    </div>
    <div className="flex gap-3">
        <Form {...form}>
            <form className="flex gap-4">
            <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover open={openStart} onOpenChange={setOpenStart}>
                    <PopoverTrigger asChild>
                <FormControl>
                        <Button
                            variant="outline"
                            className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                            )}
                        >
                            {field.value ? format(field.value, "PPP") : "Pick a date"}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                        field.onChange(date)
                        setOpenStart(false)
                        }}
                        disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                    </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
            />
            <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                <FormItem className="flex flex-col">
                    <FormLabel>End Date</FormLabel>
                    <Popover open={openEnd} onOpenChange={setOpenEnd}>
                    <PopoverTrigger asChild>
                    <FormControl>
                        <Button
                            variant="outline"
                            className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                        )}
                        >
                        {field.value ? format(field.value, "PPP") : "Pick a date"}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => {
                        field.onChange(date)
                        setOpenEnd(false)
                        }}
                        disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                    />
                    </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
            />
        </form>
        </Form>

        <div className=" space-y-2 ">
            <Label htmlFor="currency">Currency</Label>
        <Select>
                <SelectTrigger id="currency" className="w-[90px]">
                <SelectValue placeholder="Select currency" />
                </SelectTrigger>
        <SelectContent >
            <SelectItem value="INR">INR</SelectItem>
            <SelectItem value="USD">USD</SelectItem>
            <SelectItem value="DZD">DZD</SelectItem>
            <SelectItem value="JPY">JPY</SelectItem>
            <SelectItem value="KK">KK</SelectItem>
            <SelectItem value="ms">ms</SelectItem>
            <SelectItem value="EU">EU</SelectItem>
            <SelectItem value="HP">HP</SelectItem>
            <SelectItem value="UK">UK</SelectItem>
        </SelectContent>
        </Select>
    </div>
    </div>
    </div>
)
}

