export interface CreateNewClassEvent {
  blockblock_ys: string;
  class_id: string;
  class: number;
}

export interface CurrentClass {
  id: string;
  blockblock_ys: string;
  class: number;
  members: string[];
  recruitment: {
    fields: {
      blockblock_ys: string;
      // class: number;
      class: string;
      class_id: string;
      addresses: string[];
    };
    type: string;
  } | null;
}

export interface PastClass {
  id: string;
  blockblock_ys: string;
  class: number;
  next_class_id: string;
}
