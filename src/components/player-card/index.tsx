/* eslint-disable @next/next/no-img-element */
import { MINECRAFT_IMAGE } from '@/utils/constants';
import { Roles, User } from '@/utils/types';
import React from 'react'
interface PlayerCardProps {
    toggleRole: (id: string) => void;
    deleteUser: (id: string) => void;
    data: User

}
const PlayerCard = ({ toggleRole, deleteUser, data }: PlayerCardProps) => (
    <div className="border rounded p-5 min-w-[270px]" key={data.id}>
        <div className="flex row justify-between items-center">
            <div className="flex row items-center">
                <img
                    alt="userimg"
                    src={data?.image || MINECRAFT_IMAGE}
                    className="border object-contain w-14 h-14 mr-5"
                />
                <div className="flex row items-center">
                    <p className="uppercase font-bold">{data.name}</p>
                    {data.role == Roles.ADMIN && (
                        <img
                            alt="admin check"
                            src="/assets/checked.png"
                            className="w-3 h-3 ml-2"
                        />
                    )}
                </div>
            </div>
            <div className="items-center">
                <button onClick={() => deleteUser(data.id)}>
                    <img
                        alt="deleteicon"
                        src="/assets/delete.png"
                        className="w-7 h-7 fill-white invert mr-5 active:w-6 active:h-6 hover:w-8 hover:h-8 transition-all duration-100 ease-in-out"
                    />
                </button>
                <button onClick={() => toggleRole(data.id)}>
                    <img
                        alt="role"
                        title={
                            data.role === Roles.ADMIN ? "Make Player" : "Make Admin"
                        }
                        src={
                            data.role === Roles.ADMIN
                                ? "/assets/profile.png"
                                : "/assets/admin.png"
                        }
                        className="w-7 h-7 fill-white invert active:w-6 active:h-6 hover:w-8 hover:h-8 transition-all duration-100 ease-in-out"
                    />
                </button>
            </div>
        </div>
    </div>
)


export default PlayerCard