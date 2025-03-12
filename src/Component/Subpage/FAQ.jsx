import React, { useState } from 'react';
import { MdArrowForwardIos } from "react-icons/md";

const FAQ = () => {
  const Dummyanswer = [
    { question: "Death Notices", answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel purus at sapien." },
    { question: "Condolences", answer: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas." },
    { question: "Family Notices", answer: "Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante." },
    { question: "Membership Benefits", answer: "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est." },
    { question: "Handwritten Sympathy Cards & Gifts", answer: "Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra." },
    { question: "Find local businesses & service providers", answer: "Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat." },
    { question: "Livestream of funerals", answer: "Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus." },
    { question: "Find Practical Information", answer: "Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus." },
    { question: "Maps & Directions to Churches", answer: "Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis." },
    { question: "Charities & Voluntary Organisations in Ireland", answer: "Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus." }
  ];

  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleQuestionClick = (question) => {
    setActiveQuestion(question);
  };

  return (
    <div className='container cus-mt-170'>
      <h1 className="search-heading" style={{ marginTop: '220px', paddingBottom: '5px' }}>
        Frequently Asked Questions
      </h1>
      <p className='text-secondary'>Here you will find information about using End OF LIFE.ie</p>
      <div className="row">
        <div className='col-lg-4 col-md-6 col-sm-6'>
          <div className="faq-box">
            {Dummyanswer.map((data, index) => (
              <p
                key={index}
                onClick={() => handleQuestionClick(data)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '10px' }}
              >
                <span><MdArrowForwardIos /></span>
                <span style={{ display: 'inline-block', marginLeft: '10px' }} className="nav-link">
                  {data.question}
                </span>
              </p>
            ))}
          </div>
        </div>
        <div className='col-lg-8 col-md-6 col-sm-6'>
          <div className='faq-show-box p-4 border rounded' style={{ backgroundColor: '#f8f9fa', minHeight: '200px' }}>
            {activeQuestion ? (
              <>
                <h3 className='search-heading' style={{
                    fontSize: '20px',
                    paddingBottom:'2px'
                }}>{activeQuestion.question}</h3>
                <p>{activeQuestion.answer}</p>
              </>
            ) : (
              <p className='text-muted'>Select a question to view the answer.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;