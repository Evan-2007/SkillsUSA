/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/LzdaUWzDVoH
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export function editPermissions() {
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Manage User Permissions</CardTitle>
          <CardDescription>Toggle the switches to manage user permissions.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="permission1">Permission 1</Label>
            <Switch id="permission1" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="permission2">Permission 2</Label>
            <Switch id="permission2" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="permission3">Permission 3</Label>
            <Switch id="permission3" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="permission4">Permission 4</Label>
            <Switch id="permission4" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="permission5">Permission 5</Label>
            <Switch id="permission5" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}