let currentUserId = 123;
let userTickets = 0;
let isLoading = false;

const mockApiResponses = {
    getRaffleStatus: () => ({
        tickets: Math.floor(Math.random() * 20) + 1
    }),
    joinRaffle: () => ({
        success: Math.random() > 0.3,
        tickets: userTickets + Math.floor(Math.random() * 3) + 1
    })
};

async function getRaffleStatus(userId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = mockApiResponses.getRaffleStatus();
    return response;
}

async function submitRaffleEntry() {
    await new Promise(resolve => setTimeout(resolve, 800));
    const response = mockApiResponses.joinRaffle();
    
    if (!response.success) {
        throw new Error('Failed to join raffle');
    }
    
    return response;
}

function updateTicketDisplay(count) {
    const ticketCountElement = document.getElementById('ticketCount');
    ticketCountElement.textContent = count;
    
    ticketCountElement.style.transform = 'scale(1.2)';
    setTimeout(() => {
        ticketCountElement.style.transform = 'scale(1)';
    }, 200);
}

function showMessage(message, type = 'error') {
    const container = document.getElementById('messageContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `${type}-message`;
    messageDiv.textContent = message;
    
    container.innerHTML = '';
    container.appendChild(messageDiv);
    
    setTimeout(() => {
        if (container.contains(messageDiv)) {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (container.contains(messageDiv)) {
                    container.removeChild(messageDiv);
                }
            }, 300);
        }
    }, 5000);
}

function setLoadingState(loading) {
    const button = document.getElementById('raffleButton');
    const widget = document.querySelector('.raffle-widget');
    
    isLoading = loading;
    button.disabled = loading;
    
    if (loading) {
        button.textContent = 'Joining...';
        widget.classList.add('loading');
    } else {
        button.textContent = 'Join the Raffle';
        widget.classList.remove('loading');
    }
}

async function joinRaffle() {
    if (isLoading) return;
    
    setLoadingState(true);
    
    try {
        const response = await submitRaffleEntry();
        
        if (response.success) {
            userTickets = response.tickets;
            updateTicketDisplay(userTickets);
            showMessage('Successfully joined the raffle! 🎉', 'success');
            
            createConfetti();
        } else {
            throw new Error('Join failed');
        }
    } catch (error) {
        console.error('Raffle entry error:', error);
        showMessage('Error, try again.');
    } finally {
        setLoadingState(false);
    }
}

async function initializeRaffle() {
    try {
        const status = await getRaffleStatus(currentUserId);
        userTickets = status.tickets;
        updateTicketDisplay(userTickets);
    } catch (error) {
        console.error('Failed to load raffle status:', error);
        showMessage('Failed to load raffle status');
    }
}

function switchTab(tabName) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-content`).classList.add('active');
}

function createConfetti() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = '50%';
            
            document.body.appendChild(confetti);
            
            let pos = 0;
            const fall = setInterval(() => {
                pos += 3;
                confetti.style.top = pos + 'px';
                confetti.style.transform = `rotate(${pos * 2}deg)`;
                
                if (pos > window.innerHeight) {
                    clearInterval(fall);
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                }
            }, 16);
        }, i * 50);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeRaffle();
    
    document.querySelector('.raffle-widget').style.transition = 'all 0.3s ease';
});

document.addEventListener('mousemove', function(e) {
    const widgets = document.querySelectorAll('.raffle-widget, .main-content');
    widgets.forEach(widget => {
        const rect = widget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const angleX = (y - centerY) / centerY * 5;
            const angleY = (centerX - x) / centerX * 5;
            
            widget.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        } else {
            widget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
    });
});