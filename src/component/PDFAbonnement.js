import React, { Component ,useRef} from 'react';
import Pdf  from 'react-to-pdf';
import { useReactToPrint } from "react-to-print";
import '../assets/css/hidden.css';
import '../assets/css/pdfCss.css';
// const ref =React.createRef();
// const componentRef = useRef();
// const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });
const PDFAbonnement = (props) => { 
    const ref =React.createRef();
    const [showResults, setShowResults] = React.useState(false)
const componentRef = useRef(); 
const handlePrint = useReactToPrint({
    content: () => componentRef.current, 
  });  
    return(
       
        <>
         
        <div style={{margin:"0px"}} >
        <button   style={{marginLeft:"12px",marginTop:"25px"}} onClick={handlePrint} className="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-pdf-fill" viewBox="0 0 16 16">
  <path d="M5.523 10.424c.14-.082.293-.162.459-.238a7.878 7.878 0 0 1-.45.606c-.28.337-.498.516-.635.572a.266.266 0 0 1-.035.012.282.282 0 0 1-.026-.044c-.056-.11-.054-.216.04-.36.106-.165.319-.354.647-.548zm2.455-1.647c-.119.025-.237.05-.356.078a21.035 21.035 0 0 0 .5-1.05 11.96 11.96 0 0 0 .51.858c-.217.032-.436.07-.654.114zm2.525.939a3.888 3.888 0 0 1-.435-.41c.228.005.434.022.612.054.317.057.466.147.518.209a.095.095 0 0 1 .026.064.436.436 0 0 1-.06.2.307.307 0 0 1-.094.124.107.107 0 0 1-.069.015c-.09-.003-.258-.066-.498-.256zM8.278 4.97c-.04.244-.108.524-.2.829a4.86 4.86 0 0 1-.089-.346c-.076-.353-.087-.63-.046-.822.038-.177.11-.248.196-.283a.517.517 0 0 1 .145-.04c.013.03.028.092.032.198.005.122-.007.277-.038.465z"/>
  <path fill-rule="evenodd" d="M4 0h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm.165 11.668c.09.18.23.343.438.419.207.075.412.04.58-.03.318-.13.635-.436.926-.786.333-.401.683-.927 1.021-1.51a11.64 11.64 0 0 1 1.997-.406c.3.383.61.713.91.95.28.22.603.403.934.417a.856.856 0 0 0 .51-.138c.155-.101.27-.247.354-.416.09-.181.145-.37.138-.563a.844.844 0 0 0-.2-.518c-.226-.27-.596-.4-.96-.465a5.76 5.76 0 0 0-1.335-.05 10.954 10.954 0 0 1-.98-1.686c.25-.66.437-1.284.52-1.794.036-.218.055-.426.048-.614a1.238 1.238 0 0 0-.127-.538.7.7 0 0 0-.477-.365c-.202-.043-.41 0-.601.077-.377.15-.576.47-.651.823-.073.34-.04.736.046 1.136.088.406.238.848.43 1.295a19.707 19.707 0 0 1-1.062 2.227 7.662 7.662 0 0 0-1.482.645c-.37.22-.699.48-.897.787-.21.326-.275.714-.08 1.103z"/>
</svg>download payment receipt</button>
        <div className='rowRegistration' ref={componentRef}>
            {/* <h1>{props.first_name}</h1>
            <h1>{props.last_name}</h1> */}

            {/* debut dernierement ajouté */}
<div class="container">
    <div class="row justify-content-center" >
    <img class="img-responsive" alt="iamgurdeeposahan" src="https://seeklogo.com/images/T/tasshilat-logo-EF4B36438D-seeklogo.com.png" style={{width: "200px",borderRadius:"75px"}} />
    </div>

            <div class="receipt-main"></div>
            <center>
            <div class="row d-flex justify-content-center">
    			
            <div class="col-md-4 text-left">
					{/* <div class="col-xs-6 col-sm-6 col-md-6 text-left"> */}
						<div>
							<h5>Tashilat Ensaj</h5>
							<p>+9212 67890900<i class="fa fa-phone"></i></p>
							<p>ensaj@gmail.com<i class="fa fa-envelope-o"></i></p>
							<p>Morocco <i class="fa fa-location-arrow"></i></p>
						</div>
					{/* </div> */}
            </div>
			
          
            <div class="col-md-8"> 
						<div>
							<p><b>Mobile :</b> +91 12345-6789</p>
							<p><b>Email :</b> ensaj@gmail.com</p>
							<p><b>Address :</b> Australia</p>
						</div>
					</div>
					
				
         
                    </div></center>
            <div>
                    <div class="d-flex justify-content-center text-center">
						
							<h1>Receipt for {props.abonnement.type} service</h1>
						
					</div>
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="col-md-6"><b>Payment for {props.abonnement.month} / {props.abonnement.year}</b></td>
                            <td class="col-md-6"><i class="fa fa-inr"></i> {props.abonnement.montant} Dh</td>
                        </tr>
                        <tr>
                            <td class="col-md-6"><b>client information : </b></td>
                        </tr>
                        <tr>
                            <td class="col-md-6">
                                <ul>
                                <li><b>matricule</b> : {props.abonnement.client.matricule}<br/></li>
                                <li><b>full name</b> : {props.abonnement.client.lastName + " "+props.abonnement.client.firstName}<br/></li>
                                <li><b>tele</b> : {props.abonnement.client.telephone}<br/></li>
                                <li><b>email</b> : {props.abonnement.client.email}<br/></li>
                                <li><b>address</b> : {props.abonnement.client.address}</li>
                                </ul> </td>
                        </tr>
                        
                        <tr>
                            <td class="text-right col-md-6"><h2><strong>Total: </strong></h2></td>
                            <td class="text-left text-danger col-md-6"><h2><strong><i class="fa fa-inr"></i> {props.abonnement.montant} Dh</strong></h2></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
			<div class="row d-flex justify-content-center">
				<div class="receipt-header receipt-header-mid receipt-footer">
					<div >
						<div class="receipt-center d-flex justify-content-center">
							<p><b>Date :</b> {props.abonnement.datePayment}</p>
						</div>
					</div>
					<div class="col-xs-4 col-sm-4 col-md-4">
						<div class="receipt-right">
							<h1>Signature</h1>
						</div>
					</div>
				</div>
            </div>
			
        </div>    
	</div>


        


            {/* dernierement ajouté */}


        </div>      
       
        
        </>
    );

}

export default PDFAbonnement;