console.log('Script loaded'); 

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded'); 
    
    const toolInput = document.getElementById('toolInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const resultContainer = document.getElementById('resultContainer');
    const resultCard = document.getElementById('resultCard');

    console.log('Elements loaded:', {
        toolInput: !!toolInput,
        analyzeBtn: !!analyzeBtn,
        resultContainer: !!resultContainer,
        resultCard: !!resultCard
    }); 

    function formatInsights(insights) {
        return insights
            .split('\n\n')
            .map(section => {
                const lines = section.split('\n');
                const formattedLines = lines.map(line => {
                    if (line.startsWith('### ')) {
                        return `<h3>${line.replace(/^###\s+|\*\*/g, '').trim()}</h3>`;
                    }
                    if (line.startsWith('#### ')) {
                        return `<h4>${line.replace(/^####\s+|\*\*/g, '').trim()}</h4>`;
                    }
                    if (line.trim() === '---') {
                        return '<hr>';
                    }
                    if (line.trim().startsWith('- ')) {
                        const content = line.replace(/^-\s+/, '').trim();
                        return `<li>${content.replace(/\*\*/g, '')}</li>`;
                    }
                    if (line.includes('**')) {
                        return `<p>${line.replace(/\*\*/g, '').trim()}</p>`;
                    }
                    return `<p>${line.trim()}</p>`;
                });
                
                if (formattedLines.some(line => line.startsWith('<li>'))) {
                    const header = formattedLines[0];
                    const listItems = formattedLines.slice(1).join('');
                    return `<div class="insights-section">${header}<ul>${listItems}</ul></div>`;
                }
                
                return `<div class="insights-section">${formattedLines.join('')}</div>`;
            })
            .join('');
    }

    function createResultCard(data) {
        resultCard.innerHTML = '';

        const header = document.createElement('div');
        header.className = 'result-header';
        
        const toolName = document.createElement('h2');
        toolName.textContent = data.tool;
        
        const sentiment = document.createElement('span');
        sentiment.className = 'sentiment';
        sentiment.textContent = data.sentiment;
        
        header.appendChild(toolName);
        header.appendChild(sentiment);

        const body = document.createElement('div');
        body.className = 'result-body';

        const metrics = document.createElement('div');
        metrics.className = 'metrics-container';
        metrics.innerHTML = `
            <div class="metric">
                <span class="label">Tweets Analyzed</span>
                <span class="value">${data.tweetCount}</span>
            </div>
            <div class="metric">
                <span class="label">Category</span>
                <span class="value">${data.category || '-'}</span>
            </div>
        `;

        const insights = document.createElement('div');
        insights.className = 'insights';
        insights.innerHTML = `
            <h3>Analysis Results</h3>
            <div class="insights-content">
                ${formatInsights(data.insights)}
            </div>
        `;

        body.appendChild(metrics);
        body.appendChild(insights);

        if (data.alternatives && data.alternatives.length > 0) {
            const alternatives = document.createElement('div');
            alternatives.className = 'alternatives';
            alternatives.innerHTML = `
                <h3>Alternative Suggestions</h3>
                <ul>
                    ${data.alternatives.map(alt => `<li>${alt}</li>`).join('')}
                </ul>
            `;
            body.appendChild(alternatives);
        }

        resultCard.appendChild(header);
        resultCard.appendChild(body);
    }

    analyzeBtn.onclick = function() {
        const tool = toolInput.value.trim();
        
        if (!tool) {
            alert('Please enter a Web3 technology name');
            return;
        }

        resultContainer.style.display = 'block';
        resultCard.innerHTML = '<div class="loading">Analyzing...</div>';

        fetch('http://localhost:3000/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tool })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Analysis failed');
            }
            return response.json();
        })
        .then(data => {
            createResultCard(data);
            resultContainer.style.display = 'block';
        })
        .catch(error => {
            resultCard.innerHTML = `
                <div class="error">
                    <h3>Error</h3>
                    <p>Failed to analyze the technology. Please try again later.</p>
                </div>
            `;
        });
    };

    toolInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            analyzeBtn.click();
        }
    });
}); 