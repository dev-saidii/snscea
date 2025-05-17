import ModuleLauncher from "@/components/ui/ModuleLancher";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#eaf6fb] to-[#f6fbff] dark:bg-gray-900">
            <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <ModuleLauncher />
            </main>
        </div>
    );
}
