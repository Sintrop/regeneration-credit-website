import { inspectorAdapter } from "./inspectorAdapter";
import { inspectorContract } from "./inspectorContract";
import { InspectorProps } from "./types";

async function getInspector({ address }: { address: string }): Promise<InspectorProps> {
  const response = await inspectorContract.getInspector({ address });
  return inspectorAdapter.parseFromContract(response);
}

async function getInspectorAddress({ id }: { id: number }): Promise<string> {
  const response = await inspectorContract.inspectorsAddress({ id });
  return response;
}

export const inspectorService = {
  getInspector,
  getInspectorAddress
}