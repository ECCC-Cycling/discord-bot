import { Permissions, PermissionResolvable, OverwriteResolvable } from "discord.js";

export const EVERYONE_ID = "747181323676024947";
export const ATLAS_ROLE_ID = "747186214146146426";
export const SERVER_ADMIN_ROLE_ID = "747182484286079147";
export const MODERATOR_ROLE_ID = "747446050398273647";

export const LOCKED_TEXT_CHANNEL: OverwriteResolvable = {
  id: EVERYONE_ID,
  deny: [
    Permissions.FLAGS.VIEW_CHANNEL,
    Permissions.FLAGS.SEND_MESSAGES,
  ],
};

export const LOCKED_VOICE_CHANNEL: OverwriteResolvable = {
  id: EVERYONE_ID,
  deny: [
    Permissions.FLAGS.VIEW_CHANNEL,
    Permissions.FLAGS.CONNECT,
    Permissions.FLAGS.SPEAK,
  ],
};

export const MODERATOR_PERMISSIONS: PermissionResolvable[] = [
  Permissions.FLAGS.VIEW_CHANNEL,
  Permissions.FLAGS.SEND_MESSAGES,
  Permissions.FLAGS.READ_MESSAGE_HISTORY,
  Permissions.FLAGS.MANAGE_MESSAGES,
];

export const MODERATOR_VOICE_PERMISSIONS: PermissionResolvable[] = [
  Permissions.FLAGS.VIEW_CHANNEL,
  Permissions.FLAGS.CONNECT,
  Permissions.FLAGS.SPEAK,
  Permissions.FLAGS.MUTE_MEMBERS,
  Permissions.FLAGS.DEAFEN_MEMBERS,
  Permissions.FLAGS.MOVE_MEMBERS,
  Permissions.FLAGS.USE_VAD,
];

export const READ_WRITE_PERMISSIONS: PermissionResolvable[] = [
  Permissions.FLAGS.VIEW_CHANNEL,
  Permissions.FLAGS.SEND_MESSAGES,
];

export const SPEAK_ONLY_PERMISSIONS: PermissionResolvable[] = [
  Permissions.FLAGS.VIEW_CHANNEL,
  Permissions.FLAGS.CONNECT,
  Permissions.FLAGS.SPEAK,
];

export const STREAM_PERMISSIONS: PermissionResolvable[] = [
  ...SPEAK_ONLY_PERMISSIONS,
  Permissions.FLAGS.STREAM,
];
