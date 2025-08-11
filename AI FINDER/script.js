// AI Model Generator with 3D Animations and Particle Effects

class AIModelGenerator {
    constructor() {
        this.form = document.getElementById('aiForm');
        this.display = document.getElementById('aiModelDisplay');
        this.particlesContainer = document.getElementById('particles');
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.bindEvents();
        this.addFloatingAnimations();
    }
    
    createParticles() {
        // Create floating particles for background effect
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
            this.particlesContainer.appendChild(particle);
        }
    }
    
    addFloatingAnimations() {
        // Add 3D floating animations to form elements
        const inputs = document.querySelectorAll('.form-input, .form-select');
        inputs.forEach((input, index) => {
            input.addEventListener('focus', () => {
                input.style.transform = 'translateZ(20px) scale(1.02)';
                input.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.3)';
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'translateZ(0) scale(1)';
                input.style.boxShadow = 'none';
            });
        });
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.generateAIModel();
        });
    }
    
    async generateAIModel() {
        const formData = new FormData(this.form);
        const modelData = {
            name: formData.get('modelName') || document.getElementById('modelName').value,
            type: formData.get('modelType') || document.getElementById('modelType').value,
            size: formData.get('modelSize') || document.getElementById('modelSize').value,
            trainingData: formData.get('trainingData') || document.getElementById('trainingData').value,
            useCase: formData.get('useCase') || document.getElementById('useCase').value
        };
        
        // Show loading state
        this.showLoading();
        
        // Simulate AI model generation process
        setTimeout(() => {
            this.displayAIModel(this.createAIModel(modelData));
        }, 2000);
    }
    
    showLoading() {
        this.display.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p style="margin-left: 1rem; color: var(--gray-light);">Generating your AI model...</p>
            </div>
        `;
    }
    
    createAIModel(data) {
        // Generate realistic AI model specifications
        const modelSpecs = this.generateModelSpecs(data);
        
        return {
            ...data,
            ...modelSpecs,
            id: this.generateId(),
            createdAt: new Date().toISOString(),
            status: 'Ready for Training'
        };
    }
    
    generateModelSpecs(data) {
        const specs = {
            parameters: this.calculateParameters(data.size),
            architecture: this.getArchitecture(data.type),
            trainingTime: this.estimateTrainingTime(data.size, data.type),
            accuracy: this.estimateAccuracy(data.size, data.type),
            cost: this.estimateCost(data.size, data.type),
            hardware: this.getHardwareRequirements(data.size)
        };
        
        return specs;
    }
    
    calculateParameters(size) {
        const ranges = {
            small: [1000000, 100000000],
            medium: [100000000, 1000000000],
            large: [1000000000, 10000000000],
            xl: [10000000000, 100000000000]
        };
        
        const [min, max] = ranges[size] || ranges.medium;
        return Math.floor(Math.random() * (max - min) + min).toLocaleString();
    }
    
    getArchitecture(type) {
        const architectures = {
            language: ['Transformer', 'GPT-style', 'BERT-style', 'T5-style'],
            vision: ['CNN', 'Vision Transformer', 'ResNet', 'EfficientNet'],
            audio: ['Wavenet', 'Transformer', 'CNN-LSTM', 'CRNN'],
            multimodal: ['CLIP-style', 'DALL-E style', 'Flamingo', 'GATO'],
            reinforcement: ['DQN', 'PPO', 'A3C', 'SAC']
        };
        
        const archs = architectures[type] || architectures.language;
        return archs[Math.floor(Math.random() * archs.length)];
    }
    
    estimateTrainingTime(size, type) {
        const baseTime = {
            small: 2,
            medium: 8,
            large: 24,
            xl: 72
        };
        
        const multiplier = type === 'vision' ? 1.5 : type === 'multimodal' ? 2 : 1;
        return Math.round(baseTime[size] * multiplier);
    }
    
    estimateAccuracy(size, type) {
        const baseAccuracy = {
            small: 75,
            medium: 82,
            large: 88,
            xl: 92
        };
        
        const variance = Math.random() * 8 - 4;
        return Math.max(60, Math.min(98, baseAccuracy[size] + variance));
    }
    
    estimateCost(size, type) {
        const baseCost = {
            small: 500,
            medium: 2000,
            large: 8000,
            xl: 25000
        };
        
        const multiplier = type === 'multimodal' ? 1.8 : type === 'vision' ? 1.3 : 1;
        return Math.round(baseCost[size] * multiplier);
    }
    
    getHardwareRequirements(size) {
        const requirements = {
            small: 'GPU: 8GB VRAM, RAM: 16GB',
            medium: 'GPU: 16GB VRAM, RAM: 32GB',
            large: 'GPU: 24GB VRAM, RAM: 64GB',
            xl: 'GPU: 40GB+ VRAM, RAM: 128GB+'
        };
        
        return requirements[size] || requirements.medium;
    }
    
    generateId() {
        return 'ai_' + Math.random().toString(36).substr(2, 9);
    }
    
    displayAIModel(model) {
        const modelCard = `
            <div class="model-card" style="animation-delay: 0.1s">
                <div class="model-header">
                    <div class="model-icon">
                        ${this.getModelIcon(model.type)}
                    </div>
                    <div>
                        <h3 class="model-title">${model.name}</h3>
                        <p style="color: var(--gray-light); font-size: 0.9rem;">ID: ${model.id}</p>
                    </div>
                </div>
                
                <p class="model-description">
                    A ${model.size} ${model.type} model designed for ${model.useCase.toLowerCase()}. 
                    Built with ${model.architecture} architecture and trained on ${model.trainingData} data.
                </p>
                
                <div class="model-stats">
                    <div class="stat-item">
                        <div class="stat-value">${model.parameters}</div>
                        <div class="stat-label">Parameters</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${model.accuracy}%</div>
                        <div class="stat-label">Accuracy</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${model.trainingTime}h</div>
                        <div class="stat-label">Training Time</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">$${model.cost.toLocaleString()}</div>
                        <div class="stat-label">Estimated Cost</div>
                    </div>
                </div>
                
                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--light);">Hardware Requirements:</strong>
                    <p style="color: var(--gray-light); margin-top: 0.5rem;">${model.hardware}</p>
                </div>
                
                <div class="model-actions">
                    <button class="action-btn primary-action" onclick="aiGenerator.startTraining('${model.id}')">
                        <i class="fas fa-play"></i> Start Training
                    </button>
                    <button class="action-btn" onclick="aiGenerator.exportModel('${model.id}')">
                        <i class="fas fa-download"></i> Export
                    </button>
                    <button class="action-btn" onclick="aiGenerator.shareModel('${model.id}')">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="action-btn" onclick="aiGenerator.deleteModel('${model.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
        
        this.display.innerHTML = modelCard;
        
        // Add 3D hover effects
        this.add3DEffects();
    }
    
    getModelIcon(type) {
        const icons = {
            language: '💬',
            vision: '👁️',
            audio: '🎵',
            multimodal: '🔗',
            reinforcement: '🎯'
        };
        
        return icons[type] || '🤖';
    }
    
    add3DEffects() {
        const cards = document.querySelectorAll('.model-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateY(5deg)';
            });
        });
    }
    
    startTraining(modelId) {
        alert(`Starting training for model ${modelId}...`);
        // Here you would implement actual training logic
    }
    
    exportModel(modelId) {
        alert(`Exporting model ${modelId}...`);
        // Here you would implement actual export logic
    }
    
    shareModel(modelId) {
        alert(`Sharing model ${modelId}...`);
        // Here you would implement actual sharing logic
    }
    
    deleteModel(modelId) {
        if (confirm('Are you sure you want to delete this model?')) {
            alert(`Deleting model ${modelId}...`);
            // Here you would implement actual deletion logic
        }
    }
}

// Initialize the AI Model Generator when the page loads
let aiGenerator;
document.addEventListener('DOMContentLoaded', () => {
    aiGenerator = new AIModelGenerator();
});

// Add some interactive 3D effects to the page
document.addEventListener('mousemove', (e) => {
    const floatingElements = document.querySelectorAll('.floating-element');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        element.style.transform = `translate(${x}px, ${y}px) rotate(${x * 2}deg)`;
    });
});