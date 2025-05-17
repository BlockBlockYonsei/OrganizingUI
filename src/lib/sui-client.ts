import { DynamicFieldObjectData } from "@/types/club";
import { SuiObjectData } from "@mysten/sui/client";

export const parseDynamicBaseTypeField = (
  data: SuiObjectData
): DynamicFieldObjectData | null => {
  const { objectId, version, digest, type, content } = data;

  if (!content || !("fields" in content)) return null;

  const parsed: DynamicFieldObjectData = {
    objectId,
    version,
    digest,
    type: type!,
    content: {
      dataType: content.dataType,
      type: content.type,
      hasPublicTransfer: content.hasPublicTransfer,
      fields: content.fields as any,
    },
  };

  // console.log("dynamic", parsed);

  return parsed;
};
