import { useEffect, useState } from "react"
import { useAppSelector, useAppDispatch } from "@/components/store/hooks"
import { actGetUsers } from "@/components/store/users/usersSlice"

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, MoreHorizontal, Send, Trash2 } from "lucide-react"

// Fonction pour déterminer les classes en fonction du statut
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "approved":
    case "active":
      return "bg-green-200 text-green-800"
    case "pending":
      return "bg-yellow-200 text-yellow-800"
    case "suspended":
    case "inactive":
      return "bg-purple-200 text-purple-800"
    case "rejected":
    case "banned":
    case "canceled":
      return "bg-red-200 text-red-800"
    default:
      return "bg-gray-200 text-gray-800"
  }
}

const UsersManagement = () => {
  const dispatch = useAppDispatch()
  const { records } = useAppSelector((state) => state.users)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    dispatch(actGetUsers({ signal: controller.signal }))
    return () => controller.abort()
  }, [dispatch])

  const filteredRecords = records.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col items-center justify-center p-6 mt-4">
      <div className="w-full max-w-5xl space-y-4">
        {/*search input */}
        <div className="flex justify-end">
          <div className="relative w-full max-w-xs">
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10"
            />
            <Button
              type="button"
              variant="default"
              className="absolute top-0 right-0 h-full text-white bg-blue-600 rounded-l-none hover:bg-blue-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Tableau of data */}
        <div className="overflow-auto max-h-[600px] border rounded-md shadow-sm">
          <Table>
            <TableHeader className="sticky top-0 z-10 bg-white">
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((el) => (
                <TableRow key={el.id}>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.name}</TableCell>
                  <TableCell>{el.email}</TableCell>
                  <TableCell>{el.role}</TableCell>
                  <TableCell>
                    <Badge
                      className={`w-24 justify-center ${getStatusColor(
                        el.status || "pending"
                      )}`}
                    >
                      {el.status || "pending"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-5 h-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-white border shadow-lg">
                        <DropdownMenuItem className="cursor-pointer hover:bg-blue-50">
                          <Send className="w-4 h-4 mr-2" /> Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-yellow-50">
                          <Edit className="w-4 h-4 mr-2" /> Update
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer hover:bg-red-50">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default UsersManagement
