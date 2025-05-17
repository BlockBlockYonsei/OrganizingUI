// Events
export interface NewClassCreated {
  blockblock_ys: string;
  class_id: string;
  class: number;
}

export interface CurrentClassDeletedAndPastClassCreated {
  blockblock_ys: string;
  past_class_id: string;
  class: number;
}

//Object Data
export interface CurrentClub {
  id: string;
  blockblock_ys: string;
  class: number;
  members: string[];
  recruitment: {
    blockblock_ys: string;
    class: number;
    class_id: string;
    addresses: string[];
  } | null;
  executive_members: {
    address: string;
    member_type: string;
  }[];
  is_finalized: {
    president: boolean;
    vice_president: boolean;
    treasurer: boolean;
  };
  dynamicFieldData: DynamicFieldObjectData[]; // 실제 데이터 타입에 맞게 수정
}

export interface PastClub {
  id: string;
  blockblock_ys: string;
  class: number;
  members: string[];
  executive_members: {
    address: string;
    member_type: string;
  }[];
  dynamicFieldData: DynamicFieldObjectData[]; // 실제 데이터 타입에 맞게 수정
}

export interface DynamicFieldObjectData {
  objectId: string;
  version: string;
  digest: string;
  type: string;
  content: {
    dataType: string;
    type: string;
    hasPublicTransfer: boolean;
    fields: {
      id: {
        id: string;
      };
      name: {
        type: string;
        fields: any;
      };
      value: string;
    };
  };
}
