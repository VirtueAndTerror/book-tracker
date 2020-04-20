import React from 'react';
import './SidebarTotals.css';

const SidebarTotals = ({ cbData, wlData }) => {
	const cCount = cbData.length;
	const wlCount = wlData.length;
	return (
		<div className='row'>
			<div className='col-3'>
				<div className='sideBar'>
					<table>
						<thead>
							<tr>
								<th>Description</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Read</td>
								<td>5</td>
							</tr>
							<tr>
								<td>Wishlist</td>
								<td>{wlCount}</td>
							</tr>
							<tr>
								<td>Current</td>
								<td>{cCount}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default SidebarTotals;
