import imageGedung from '@/assets/gedung.png';

function SectionLanding() {
  return (
    <section
      className="container-fluid first-section company-container container-primary"
      style={{
        // backgroundImage: `url(${imageGedung})`,
        // backgroundPosition: 'right bottom',
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'contain',
        // backgroundColor: `linear-gradient( 0deg, rgb(255, 124, 124) 0%, rgba(224, 66, 66, 1) 40%)`,
      }}
    >
      <div className="row" style={{ zIndex: 0 }}>
        <div className="col-sm-11 col-lg-6">
          <h1 className='title mb-3'>Membantu Temukan Solusi Anda!</h1>
          <p className='desc mb-4'>
            PT Telekomunikasi Indonesia telah membangun jaringan telekomunikasi
            yang andal dan kuat, menghubungkan jutaan orang di seluruh negeri
            dan memberikan akses yang luas ke layanan telekomunikasi.
          </p>
          <button className="button button-primary">Temukan Disini</button>
        </div>
      </div>
    </section>
  );
}

export default SectionLanding;
