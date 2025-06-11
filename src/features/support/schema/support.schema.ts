import { z } from "zod";

// Inner content structure (parsed from JSON string)
const FilterContentSchema = z.object({
  status: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
  startDateTime: z.array(z.string()).optional(),
  endDateTime: z.array(z.string()).optional(),
});

// Single item schema
export const PropertyItemSchema = z.object({
  id: z.string(),
  domainName: z.string(),
  content: z.string().refine(
    (val) => {
      try {
        JSON.parse(val);
        return true;
      } catch {
        return false;
      }
    },
    { message: "content must be a valid JSON string" }
  ),
  propertyName: z.string(),
});

// Array schema (raw form, content is still string)
export const RawPropertyListSchema = z.array(PropertyItemSchema);

// ✅ Parsed version where `content` is parsed into a JSON object
export const ParsedPropertyItemSchema = z.object({
  id: z.string(),
  domainName: z.string(),
  content: FilterContentSchema, // parsed content
  propertyName: z.string(),
});

export const ParsedPropertyListSchema = z.array(ParsedPropertyItemSchema);

// Types
export type RawPropertyItem = z.infer<typeof PropertyItemSchema>;
export type RawPropertyList = z.infer<typeof RawPropertyListSchema>;

export type ParsedPropertyItem = z.infer<typeof ParsedPropertyItemSchema>;
export type ParsedPropertyList = z.infer<typeof ParsedPropertyListSchema>;

