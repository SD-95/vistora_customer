import React, { useState } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';

const specifications = [
  { label: 'Brand', value: 'GharSoaps' },
  { label: 'Model Name', value: 'Magic Soap Sandal Wood And Saffron for DeTan and Glowing Brightening Skin' },
  { label: 'Quantity', value: '100 g' },
  { label: 'Pack of', value: '1' },
  { label: 'Organic', value: 'Yes' },
  { label: 'Ideal For', value: 'Men & Women' },
  { label: 'Fragrance Scent', value: 'Saffron' },
  { label: 'Composition', value: 'Saffron, Sandalwood, Coconut' },
  { label: 'Color', value: 'Brown' },
  { label: 'Type', value: 'Bathing Soap' },
  { label: 'Brand Fragrance', value: 'Saffron' },
  { label: 'Skin Type', value: 'All Skin Types' },
  { label: 'Maximum Shelf Life', value: '24 Months' },
  { label: 'Application Area', value: 'Face, Body, Hair' },
  { label: 'Country of Origin', value: 'India' },
  { label: 'Net Quantity', value: '1 Soap' },
];

const Specifications: React.FC = () => {
  const [showInfoModal, setShowInfoModal] = useState(false);

  return (
    <div className="specifications">
      <h5 className="mb-4 fw-bold">Specifications</h5>

      <Table bordered hover responsive size="sm" className="spec-table">
        <tbody>
          {specifications.map((item, index) => (
            <tr key={index}>
              <td className="fw-semibold text-muted" style={{ width: '35%' }}>{item.label}</td>
              <td className="text-dark">{item.value}</td>
            </tr>
          ))}

          <tr style={{ background: '#f8f9fa' }}>
            <td colSpan={2} className="text-center">
              <Button
                variant="link"
                className="text-decoration-none fw-semibold"
                onClick={() => setShowInfoModal(true)}
              >
                Manufacturing, Packaging and Import Info
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showInfoModal} onHide={() => setShowInfoModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Manufacturing, Packaging and Import Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <strong>Generic Name:</strong> Soaps<br />
            <strong>Expiry Date:</strong> 21 Aug, 2025<br />
            <strong>Country of Origin:</strong> India
          </div>

          <div className="mb-3">
            <h6 className="fw-bold mb-2">Manufacturer's Details</h6>
            <p className="mb-0 text-muted">YEH MERA INDIA</p>
          </div>

          <div className="mb-1">
            <h6 className="fw-bold mb-2">Packer's Details</h6>
            <p className="mb-0 text-muted">Same as Manufacturer</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Specifications;
