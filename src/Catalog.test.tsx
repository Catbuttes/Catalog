import React from 'react';
import { render, screen, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Catalog from './Catalog';

fetchMock.enableMocks();

beforeEach(() => {
    fetchMock.resetMocks();
});  

test('Renders the title correctly', async () => {
    fetchMock.mockResponse(JSON.stringify(
        {
            title: "This is the page title",
            files: [],
            directories: []
        }
    ));
    
    await act( 
        async () => {
            render(<Catalog indexFileDir="."/>)
        }
    );
    
    const titleElement = screen.getByText("This is the page title");
    expect(titleElement).toBeInTheDocument();

  });