import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalSettingsState {
  feedModal: {
    type: "edit" | "post" | "duplicate" | null;
    isOpen: boolean;
    communityId: number | null;
    spaceId: number | null;
    postId: string | null;
  };
  postOption: {
    isOpen: boolean;
    postId: string | null;
  };
  sidebarServerToggle: boolean;
  createSpaceToggle: {
    toggle: boolean;
    spaceGroupId: number | null;
  };
  editSpaceGroup: {
    toggle: boolean;
    spaceGroupId: number | null;
  };
  createSpaceGroupToggle: boolean;
  bellNotificationToggle: boolean;
  memberRole: "owner" | "admin" | "moderator" | "member";
  spaceGroupId: number | null;
  addMembersToggle: boolean;
  addMembersModalToggle: boolean;
}

const initialState: GlobalSettingsState = {
  feedModal: {
    type: null,
    isOpen: false,
    communityId: null,
    spaceId: null,
    postId: null,
  },
  addMembersToggle: false,
  addMembersModalToggle: false,
  postOption: {
    isOpen: false,
    postId: null,
  },
  sidebarServerToggle: false,
  createSpaceToggle: {
    toggle: false,
    spaceGroupId: null,
  },
  editSpaceGroup: {
    toggle: false,
    spaceGroupId: null,
  },
  createSpaceGroupToggle: false,
  bellNotificationToggle: false,
  memberRole: "member",
  spaceGroupId: null,
};

const globalSettingsSlice = createSlice({
  name: "globalSettings",
  initialState,
  reducers: {
    setFeedModal: (state, action) => {
      state.feedModal = action.payload;
    },
    setBellNotificationToggle: (state, action) => {
      state.bellNotificationToggle = action.payload;
    },
    setCreateSpaceModal: (state, action) => {
      state.createSpaceToggle = action.payload;
    },
    setEditSpaceGroup: (state, action) => {
      state.editSpaceGroup = action.payload;
    },
    setAddMembers: (state, action) => {
      state.addMembersToggle = action.payload;
    },
    setCreateSpaceGroupModal: (state, action) => {
      state.createSpaceGroupToggle = action.payload;
    },
    setCreateAddMembersModal: (state, action) => {
      state.addMembersModalToggle = action.payload;
    },
    setMemberRole: (state, action) => {
      state.memberRole = action?.payload;
    },
    setSidebarServerToggle: (state, action) => {
      state.sidebarServerToggle = action.payload;
    },
    setPostOptionToggle: (state, action) => {
      state.postOption = {
        isOpen: action.payload.isOpen,
        postId: action.payload.postId ?? null,
      };
    },
    setSpaceGroupId: (state, action: PayloadAction<number | null>) => {
      state.spaceGroupId = action.payload;
    },
  },
});

export const {
  setFeedModal,
  setBellNotificationToggle,
  setPostOptionToggle,
  setCreateSpaceModal,
  setCreateSpaceGroupModal,
  setSidebarServerToggle,
  setMemberRole,
  setSpaceGroupId,
  setEditSpaceGroup,
  setAddMembers,
  setCreateAddMembersModal,
} = globalSettingsSlice.actions;
export default globalSettingsSlice.reducer;
