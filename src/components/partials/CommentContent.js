import React from 'react'
import { firstLetterUpperCase, firstLetterLowerCase } from '../functions.js';

const CommentContent = ({ email, title, body, date, time }) => {
  return (
    <div className="one-comment-wrapper">
      <div className="comment-text-wrapper">
        <div className='email-wrapper'>
            <span className='email-item'>{firstLetterLowerCase(email)}</span>
        </div>
        <div className='comment-list-item-link-wrapper'>
            <h2 className="comment-title">{firstLetterUpperCase(title)}</h2>
            <p className="comment-body">{firstLetterUpperCase(body)}</p>
        </div>
        <div className='comment-date-wrapper'>
            <span className="comment-date">{date}</span>
            <span className="comment-time">{time}</span>
        </div>
      </div>
    </div>
  )
}

export default CommentContent