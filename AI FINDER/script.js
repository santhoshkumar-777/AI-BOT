// AI Model Generator with 3D Animations and Particle Effects

class AIModelGenerator {
    constructor() {
        this.form = document.getElementById('aiForm');
        this.display = document.getElementById('aiModelDisplay');
        this.particlesContainer = document.getElementById('particles');
        this.models = [];
        
        // Navigation elements
        this.newModelBtn = document.getElementById('newModelBtn');
        this.downloadBtn = document.getElementById('downloadBtn');
        this.shareBtn = document.getElementById('shareBtn');
        
        // Modal elements
        this.downloadModal = document.getElementById('downloadModal');
        this.shareModal = document.getElementById('shareModal');
        this.newModelModal = document.getElementById('newModelModal');
        this.trainingModal = document.getElementById('trainingModal');
        this.closeModalBtns = document.querySelectorAll('.close-modal');
        this.createFirstModelBtn = document.getElementById('createFirstModel');
        this.startNewModelBtn = document.getElementById('startNewModel');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        
        // Training elements
        this.trainingModelName = document.getElementById('trainingModelName');
        this.trainingModelDetails = document.getElementById('trainingModelDetails');
        this.trainingProgressBar = document.getElementById('trainingProgressBar');
        this.trainingProgressPercent = document.getElementById('trainingProgressPercent');
        this.trainingStatus = document.getElementById('trainingStatus');
        this.pauseTrainingBtn = document.getElementById('pauseTrainingBtn');
        this.completeTrainingBtn = document.getElementById('completeTrainingBtn');
        this.toolCheckboxes = document.querySelectorAll('.tool-checkbox');
        
        this.trainingInterval = null;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.createParticles();
        this.bindEvents();
        this.addFloatingAnimations();
        this.setupModals();
    }
    
    setupModals() {
        // Open modals
        this.newModelBtn.addEventListener('click', () => this.openModal('newModelModal'));
        this.downloadBtn.addEventListener('click', () => this.openModal('downloadModal'));
        this.shareBtn.addEventListener('click', () => this.openModal('shareModal'));
        
        // Close modals
        this.closeModalBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const modalId = btn.getAttribute('data-modal');
                this.closeModal(modalId);
            });
        });
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target.id);
            }
        });
        
        // Create first model button
        this.createFirstModelBtn.addEventListener('click', () => {
            this.closeModal('downloadModal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        // Start new model button
        this.startNewModelBtn.addEventListener('click', () => {
            this.closeModal('newModelModal');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.form.reset();
        });
        
        // Copy share link
        this.copyLinkBtn.addEventListener('click', () => {
            const shareLink = document.getElementById('shareLink');
            shareLink.select();
            document.execCommand('copy');
            this.showToast('Link copied to clipboard!');
        });
    }
    
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    showToast(message) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Show and hide toast
        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        }, 100);
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
            const model = this.createAIModel(modelData);
            this.models.push(model);
            this.displayAIModel(model);
            this.updateDownloadList();
            this.showToast('AI Model generated successfully!');
        }, 2000);
    }
    
    updateDownloadList() {
        const downloadList = document.getElementById('downloadList');
        
        if (this.models.length === 0) {
            downloadList.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-cloud-download-alt empty-icon"></i>
                    <p>No models available for download yet</p>
                    <button class="action-btn primary-action" id="createFirstModel">
                        <i class="fas fa-plus"></i> Create Your First Model
                    </button>
                </div>
            `;
            document.getElementById('createFirstModel').addEventListener('click', () => {
                this.closeModal('downloadModal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            return;
        }
        
        let html = '';
        this.models.forEach(model => {
            html += `
                <div class="download-item">
                    <div class="download-info">
                        <div class="download-icon">${this.getModelIcon(model.type)}</div>
                        <div>
                            <h3>${model.name}</h3>
                            <p>Type: ${model.type}, Size: ${model.size}, Parameters: ${model.parameters}</p>
                        </div>
                    </div>
                    <div class="download-actions">
                        <button class="action-btn" onclick="aiGenerator.exportModel('${model.id}')">
                            <i class="fas fa-download"></i> Download
                        </button>
                    </div>
                </div>
            `;
        });
        
        downloadList.innerHTML = html;
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
        // Determine train button text and class based on trained status
        const trainBtnText = model.trained ? 
            '<i class="fas fa-check-circle"></i> Trained' : 
            '<i class="fas fa-play"></i> Start Training';
        const trainBtnClass = model.trained ? 'action-btn primary-action trained' : 'action-btn primary-action';
        
        // Create tools section if model is trained and has tools
        let toolsSection = '';
        if (model.trained && model.tools && model.tools.length > 0) {
            toolsSection = `
                <div style="margin-bottom: 1rem;">
                    <strong style="color: var(--light);">Included Tools:</strong>
                    <div class="tools-list" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">
                        ${model.tools.map(tool => `<span class="tool-tag" style="background: rgba(99, 102, 241, 0.2); padding: 0.3rem 0.6rem; border-radius: 1rem; font-size: 0.8rem; color: var(--primary);"><i class="fas fa-tools"></i> ${tool}</span>`).join('')}
                    </div>
                </div>
            `;
        }
        
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
                
                ${toolsSection}
                
                <div class="model-actions">
                    <button class="${trainBtnClass}" onclick="aiGenerator.startTraining('${model.id}')">
                        ${trainBtnText}
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
        const model = this.models.find(m => m.id === modelId);
        if (!model) return;
        
        // Set training modal content
        this.trainingModelName.textContent = model.name;
        this.trainingModelDetails.textContent = `Type: ${model.type}, Size: ${model.size}`;
        
        // Reset progress
        this.trainingProgressBar.style.width = '0%';
        this.trainingProgressPercent.textContent = '0';
        this.trainingStatus.textContent = 'Initializing training environment...';
        
        // Reset tool checkboxes based on model type
        this.toolCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Pre-select tools based on model type
        if (model.type === 'language') {
            document.getElementById('toolNLP').checked = true;
            document.getElementById('toolTransformer').checked = true;
        } else if (model.type === 'vision') {
            document.getElementById('toolCV').checked = true;
            document.getElementById('toolGAN').checked = true;
        } else if (model.type === 'audio') {
            document.getElementById('toolSpeech').checked = true;
        } else if (model.type === 'reinforcement') {
            document.getElementById('toolRL').checked = true;
        } else if (model.type === 'multimodal') {
            document.getElementById('toolNLP').checked = true;
            document.getElementById('toolCV').checked = true;
            document.getElementById('toolSpeech').checked = true;
        }
        
        // Open training modal
        this.openModal('trainingModal');
        
        // Reset pause state
        this.isPaused = false;
        this.pauseTrainingBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Training';
        
        // Set up event listeners
        this.pauseTrainingBtn.onclick = () => this.toggleTrainingPause();
        this.completeTrainingBtn.onclick = () => this.completeTraining(modelId);
        
        // Start training simulation
        let progress = 0;
        const trainingSteps = [
            { percent: 5, status: 'Preparing training data...' },
            { percent: 10, status: 'Initializing model architecture...' },
            { percent: 20, status: 'Setting up optimizer and loss functions...' },
            { percent: 30, status: 'Starting training epoch 1/10...' },
            { percent: 40, status: 'Training epoch 3/10: Loss decreasing...' },
            { percent: 50, status: 'Training epoch 5/10: Validation metrics improving...' },
            { percent: 60, status: 'Training epoch 7/10: Fine-tuning hyperparameters...' },
            { percent: 70, status: 'Training epoch 9/10: Finalizing model weights...' },
            { percent: 80, status: 'Training complete. Running evaluation...' },
            { percent: 90, status: 'Optimizing model for deployment...' },
            { percent: 95, status: 'Packaging model with selected tools...' },
            { percent: 100, status: 'Training complete! Your model is ready.' }
        ];
        
        let stepIndex = 0;
        
        this.trainingInterval = setInterval(() => {
            if (this.isPaused) return;
            
            if (stepIndex < trainingSteps.length) {
                const step = trainingSteps[stepIndex];
                progress = step.percent;
                this.trainingProgressBar.style.width = `${progress}%`;
                this.trainingProgressPercent.textContent = progress;
                this.trainingStatus.textContent = step.status;
                stepIndex++;
                
                // Auto-complete when reaching 100%
                if (progress === 100) {
                    setTimeout(() => {
                        this.completeTraining(modelId);
                    }, 1500);
                }
            } else {
                clearInterval(this.trainingInterval);
            }
        }, 1500);
    }
    
    toggleTrainingPause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.pauseTrainingBtn.innerHTML = '<i class="fas fa-play"></i> Resume Training';
            this.trainingStatus.textContent += ' (Paused)';
        } else {
            this.pauseTrainingBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Training';
            this.trainingStatus.textContent = this.trainingStatus.textContent.replace(' (Paused)', '');
        }
    }
    
    completeTraining(modelId) {
        clearInterval(this.trainingInterval);
        
        // Get selected tools
        const selectedTools = [];
        this.toolCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const toolName = checkbox.nextElementSibling.querySelector('span').textContent;
                selectedTools.push(toolName);
            }
        });
        
        // Update model with selected tools
        const model = this.models.find(m => m.id === modelId);
        if (model) {
            model.tools = selectedTools;
            model.trained = true;
            model.status = 'Trained';
        }
        
        // Close training modal
        this.closeModal('trainingModal');
        
        // Update model display
        this.displayAIModel(model);
        
        // Show success message
        this.showToast(`Model "${model.name}" has been successfully trained!`);
    }
    
    exportModel(modelId) {
        const model = this.models.find(m => m.id === modelId);
        if (!model) {
            this.showToast('Model not found!');
            return;
        }
        
        // Create a JSON file for download
        const modelData = JSON.stringify(model, null, 2);
        const blob = new Blob([modelData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create download link
        const a = document.createElement('a');
        a.href = url;
        a.download = `${model.name.replace(/\s+/g, '_')}_model.json`;
        document.body.appendChild(a);
        a.click();
        
        // Clean up
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            this.showToast('Model exported successfully!');
        }, 100);
    }
    
    shareModel(modelId) {
        const model = this.models.find(m => m.id === modelId) || this.models[this.models.length - 1];
        if (!model) {
            this.showToast('No model available to share!');
            return;
        }
        
        // Update share link and QR code
        const shareLink = document.getElementById('shareLink');
        const shareUrl = `https://aifinder.example.com/model/${model.id}`;
        shareLink.value = shareUrl;
        
        // Update QR code
        const qrCode = document.getElementById('qrCode');
        qrCode.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(shareUrl)}" alt="QR Code">`;
        
        // Open share modal
        this.openModal('shareModal');
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
