import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import TodoPage from "@/component/TodoPage";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if(!session){
        redirect("/sigin")
    }

    return (
        <div>
            <TodoPage />
        </div>
    )
}