import CreatePost from "../CreatePost/CreatePost"
import EditAvatar from "../EditAvatar/EditAvatar"
import EditInfo from "../EditInfo/EditInfo"
import EditProfile from "../EditProfile/EditProfile"
import { ModalExit } from "../EditProfile/EditProfile"

export const typeModal = {
    editProfile: 'edit-profile',
    editAvatar: 'edit-avatar',
    exit: 'exit',
    editInfo: 'edit-info',
    createPost: 'create-post'
}

export const innerModal = [
    { type: typeModal.editProfile, inner: EditProfile },
    { type: typeModal.editAvatar, inner: EditAvatar },
    { type: typeModal.exit, inner: ModalExit },
    { type: typeModal.editInfo, inner: EditInfo },
    { type: typeModal.createPost, inner: CreatePost },
] 