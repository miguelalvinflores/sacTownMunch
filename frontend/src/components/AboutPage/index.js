import './AboutPage.css';
// comment
export default function AboutPage() {
  return (
    <div className='about-wrapper'>
      <div className='person'>
        <h2 className='bio-name'>Miguel</h2>
        <p className='bio'>Originally a B.S. in Mechanical Engineering, Miguel found his passion for programming while spearheading a HS coding camp for disadvantaged Section 8 youth through the Housing Authority of the City of Santa Barbara. After graduation, Miguel sought to further his programming skills by enrolling in the fullstack software engineering program provided by App Academy.</p>
        <div className='social-media'>
          <a href="https://www.linkedin.com/in/miguelalvinflores/" rel="noreferrer" target='_blank'>
            <img className='expand' alt='LinkedIn logo' src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1617830781/linkedin_vanlho.png' />
          </a>
          <a href='https://github.com/miguelalvinflores' rel="noreferrer" target='_blank'>
            <img className='expand' alt='GitHub logo' src='https://res.cloudinary.com/dbu0tmeuc/image/upload/v1617830781/GitHub-Mark_duumkr.png' />
          </a>
        </div>
      </div>
    </div>
  );
};
