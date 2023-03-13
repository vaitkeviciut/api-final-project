import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

const AlbumPage = () => {
    const { albumId } = useParams();
  return (
    <div>AlbumPage</div>
  )
}

export default AlbumPage