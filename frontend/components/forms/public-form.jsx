"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"

export function PublicForm({ fields = [], textarea, button = "Submit", onSubmit }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (onSubmit) {
        await onSubmit(new FormData(e.currentTarget))
      }
      e.target.reset() // Clear input fields after successful submit
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="grid gap-4 rounded-2xl border border-border/70 bg-card p-6 shadow-soft md:p-7" onSubmit={handleSubmit}>
      {fields.map((field) => {
        const name = typeof field === "string" ? field : field.name
        const label = typeof field === "string" ? field : field.label
        const type = typeof field === "string" ? "text" : field.type || "text"
        const options = typeof field === "object" ? field.options : null
        return (
          <div key={name} className="grid gap-2">
            <Label className="text-sm font-semibold">{label}</Label>
            {options ? (
              <select name={name} className="h-11 rounded-xl border border-input bg-transparent px-3 text-sm">
                {options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : (
              <Input name={name} type={type} placeholder={label} className="h-11 rounded-xl" disabled={loading} />
            )}
          </div>
        )
      })}
      {textarea && (
        <div className="grid gap-2">
          <Label className="text-sm font-semibold">{textarea}</Label>
          <Textarea name="message" placeholder={textarea} className="min-h-28 rounded-xl" disabled={loading} />
        </div>
      )}
      <Button type="submit" disabled={loading} className="mt-1 h-11 rounded-xl bg-accent text-base font-semibold text-accent-foreground hover:bg-accent/90">
        {loading ? <Loader2 className="mr-2 size-5 animate-spin" /> : null}
        {button}
      </Button>
    </form>
  )
}
