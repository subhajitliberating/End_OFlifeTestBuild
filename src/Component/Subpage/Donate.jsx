import React from 'react';
import demo from '../../assets/demo.jpg'
const Donate = () => {
  const donationData = [
    { id: 1, title: 'Education Fund', image: demo, link: 'https://example.com' },
    { id: 2, title: 'Healthcare Fund', image: demo, link: 'https://example.com' },
    { id: 3, title: 'Environment Fund', image: demo, link: 'https://example.com' },
    { id: 1, title: 'Education Fund', image: demo, link: 'https://example.com' },
    { id: 2, title: 'Healthcare Fund', image: demo, link: 'https://example.com' },
    { id: 3, title: 'Environment Fund', image: demo, link: 'https://example.com' },
  ];

  return (
    <div className='container cus-mt-170'>
      <h1 className="search-heading text-center" style={{ marginTop: '220px', paddingBottom: '5px' }}>Donate</h1>
      <p className="text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus at sapien.</p>
      <div className="row">
        {donationData.map((item) => (
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <img src={item.image} className="cus-card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title text-center search-heading" style={{
                    fontSize: '20px',
                    paddingBottom:'2px'
                }}>{item.title}</h5>
                <a href={item.link} className="text-center nav-link">Visit Website</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Donate;