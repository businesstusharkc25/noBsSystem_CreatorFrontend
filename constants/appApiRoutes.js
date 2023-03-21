// Base Routes
export const contentRoute = "/content";
export const membershipRoute = "/membership";
export const userRoute = "/user";
export const channelRoute = "/channel";

// Content Routes

export const addContentRoute = `${contentRoute}/add-content`;
export const getContentRoute = `${contentRoute}/get-all`;
export const getContentByIdRoute = `${contentRoute}/get-content`;
export const updateContentRoute = `${contentRoute}/update-content`;
export const deleteContentByIdRoute = `${contentRoute}/delete-content`;

// Wallet Routes

export const connectWalletRoute = `${userRoute}/connect-wallet`;
export const changeCurrentChannelRoute = `${userRoute}/change-current-channel`;

// Membership Routes

export const addMembershipRoute = `${membershipRoute}/add-membership`;
export const updateMembershipRoute = `${membershipRoute}/update-membership`;
export const getMembershipsRoute = `${membershipRoute}/get-memberships`;
export const getMembershipRoute = `${membershipRoute}/get-membership`;
export const deleteMembershipRoute = `${membershipRoute}/delete-membership`;

// Channel Routes

export const getAllUserChannels = `${channelRoute}/get-channels`;
export const addChannelRoute = `${channelRoute}/create-channel`;
