import { Payment, columns } from "@/components/DataTable/Columns";
import { DataTable } from "@/components/DataTable/DataTable";

async function fetchStatus(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      status: "borrowing",
      stationName: "茨城高専",
      port: 1,
      borrowedAt: "2024-01-08T12:00:00",
      returnedAt: "2024-01-08T14:00:00",
      usageTime: "120",
    },
  ];
}

const Status = async () => {
  const data = await fetchStatus();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default Status;
