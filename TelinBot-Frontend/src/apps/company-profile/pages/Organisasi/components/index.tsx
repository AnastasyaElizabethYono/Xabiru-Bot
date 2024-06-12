import React from 'react';
import SectionDeskripsi from './SectionDeskripsi';
import SectionPenghargaan from './SectionPenghargaan';
import SectionVisiMisi from './SectionVisiMisi';
import SectionStruktur from './SectionStruktur';

function Main() {
  return (
    <>
      <SectionDeskripsi />
      <SectionVisiMisi />
      <SectionPenghargaan />
      <SectionStruktur />
    </>
  );
}

export default Main;
