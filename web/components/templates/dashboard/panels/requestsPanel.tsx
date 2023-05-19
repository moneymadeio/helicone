import { UserGroupIcon } from "@heroicons/react/24/outline";
import { Result } from "../../../../lib/result";
import { RequestsOverTime } from "../../../../lib/timeCalculations/fetchTimeData";
import LoadingAnimation from "../../../shared/loadingAnimation";
import { RenderBarChart } from "../../../shared/metrics/barChart";
import { Loading } from "../dashboardPage";

interface RequestsPanelProps {
  requestsOverTime: Loading<Result<RequestsOverTime[], string>>;
  timeMap: (date: Date) => string;
}

function unwrapDefaultEmpty<T>(data: Loading<Result<T[], string>>): T[] {
  if (data === "loading") {
    return [];
  }
  if (data.error !== null) {
    return [];
  }
  return data.data;
}

const RequestsPanel = (props: RequestsPanelProps) => {
  const { requestsOverTime, timeMap } = props;

  return (
    <div className="grid grid-cols-5 gap-4 h-96">
      <div className="col-span-3 bg-white border border-gray-300 rounded-lg">
        <div className="flex flex-col space-y-4 py-6">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            Requests
          </h3>
          <div className="h-72 px-4">
            {requestsOverTime === "loading" ? (
              <div className="h-full w-full flex-col flex p-8">
                <div className="h-full w-full rounded-lg bg-gray-300 animate-pulse" />
              </div>
            ) : (
              <RenderBarChart
                data={unwrapDefaultEmpty(requestsOverTime).map((r) => ({
                  ...r,
                  value: r.count,
                }))}
                timeMap={timeMap}
                valueLabel="requests"
              />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-2 bg-white border border-gray-300 rounded-lg">
        <div className="w-full h-full items-center justify-center align-middle flex flex-col">
          <UserGroupIcon className="h-12 w-12 text-gray-500" />
          <p className="text-md text-gray-700">Top Users (coming soon)</p>
        </div>
      </div>
    </div>
  );
};

export default RequestsPanel;