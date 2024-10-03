function searchEmployee() {
  const searchTerm = document.getElementById('searchTerm').value;

  fetch(`http://localhost:8983/solr/employee_data/select?q=${searchTerm}&wt=json`)
    .then(response => response.json())
    .then(data => {
      const resultsBody = document.getElementById('resultsBody');
      resultsBody.innerHTML = '';

      if (data.response.docs.length > 0) {
        data.response.docs.forEach(doc => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.textContent = doc.name || 'N/A';
          row.appendChild(nameCell);

          const deptCell = document.createElement('td');
          deptCell.textContent = doc.department || 'N/A';
          row.appendChild(deptCell);

          const jobTitleCell = document.createElement('td');
          jobTitleCell.textContent = doc.job_title || 'N/A';
          row.appendChild(jobTitleCell);

          const locationCell = document.createElement('td');
          locationCell.textContent = doc.location || 'N/A';
          row.appendChild(locationCell);

          resultsBody.appendChild(row);
        });
      } else {
        const row = document.createElement('tr');
        const noDataCell = document.createElement('td');
        noDataCell.setAttribute('colspan', '4');
        noDataCell.textContent = 'No results found';
        row.appendChild(noDataCell);
        resultsBody.appendChild(row);
      }
    })
    .catch(error => console.error('Error fetching data:', error));
}
