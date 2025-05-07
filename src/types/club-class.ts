export interface CreateNewClassEvent {
  blockblock_ys: string;
  class_id: string;
  class: number;
}

export interface CurrentClass {
  id: string;
  blockblock_ys: string;
  class: number;
  is_open_for_new_members: boolean;
}

export interface PastClass {
  id: string;
  blockblock_ys: string;
  class: number;
  next_class_id: string;
}
