import React from 'react'
import { Icon } from "@iconify/react";

import Heading from '../../components/heading'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useInput from '../../hooks/useInput';
import { asyncAddThreads } from '../../state/threads/action';

export default function AddThreadPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [title, onTitleChange] = useInput('');
    const [body, onBodyChange] = useInput('');
    const [category, onCategoryChange] = useInput('');

    const onAddThread = async (e) => {
        e.preventDefault();
        dispatch(asyncAddThreads({ title, body, category }));
        navigate('/');
    }

    return (
        <>
            <div>
                <Heading title='Forum Diskusi Baru' />

                <form onSubmit={onAddThread} className='mt-10' action="">
                    <div className='flex flex-col gap-5'>
                        <input type="text" placeholder='Masukan Judul Baru' name="title" id="title" className='border-2 border-secondary rounded-md p-2' value={title} onChange={onTitleChange} />

                        <div className="relative w-full">
                            <select name="category" className="w-full appearance-none text-text font-poppins p-2 rounded-md focus:outline-none cursor-pointer border-2 border-secondary" value={category} onChange={onCategoryChange}>
                                <option value={""}>Pilih</option>
                                <option value={"HTML"}>HTML</option>
                                <option value={"Redux"}>Redux</option>
                                <option value={"Perkenalan"}>Perkenalan</option>
                            </select>

                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
                                <Icon
                                icon="bxs:down-arrow"
                                className="text-secondary"
                                width="20"
                                height="20"
                                />
                            </div>
                        </div>

                        <textarea placeholder="Masukan Keterangan Baru" className='border-2 border-secondary rounded-md p-2' rows={5} id="body" name='body' value={body} onChange={onBodyChange}></textarea>

                        <button type='submit' className='bg-btn text-acent font-medium py-2 px-9 rounded-md cursor-pointer'>Simpan</button>
                    </div>
                </form>
            </div>
        </>
    )
}
