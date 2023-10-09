import React from 'react'
import Style from './Footer.module.css';

export default function Footer() {
  return <>
    <section className='footer'>
      <div className="mx-5 py-5">
        <h1 className='h5 fw-bolder'>Get the FreshCart app</h1>
        <p className='text-muted'>We will send you a link, open it on your phone to download the app.</p>

        {/* <div className='d-flex justify-content-evenly mt-3'>
          <input type="text" className='w-75' placeholder='Email..' />
          <button className='btn bg-main text-light font-sm mx-2'>Share App Link</button>
        </div> */}

        <div className='row mx-auto'>
          <div className="col-md-10">
            <input type="text" className='mt-2' placeholder='Email..' />
          </div>

          <div className="col-md-2 text-center">
            <button className='btn bg-main text-light mt-2 font-sm mx-2'>Share App Link</button>
          </div>
        </div>

        <div className='row my-3 border p-3'>
          <div className='col-md-6 my-2'>
            <span>Payment Partners</span>
          </div>
          <div className='col-md-6 my-2'>
            <span>Get delivries with FreshCart</span>
          </div>
        </div>

        {/* <div className='d-flex justify-content-between my-3 border p-3'>
          <div>
            <span>Payment Partners</span>
          </div>
          <div>
            <span>Get delivries with FreshCart</span>
          </div>
        </div> */}
      </div>
    </section>
  </>
}
