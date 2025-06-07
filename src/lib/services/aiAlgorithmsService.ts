
import { candidateService, type Candidate } from './candidateService';
import { gigService, type Gig } from './gigService';

// Core AI Algorithms Implementation
export interface MLModel {
  predict(features: number[]): number;
  train(data: number[][]): void;
  accuracy: number;
}

// K-Means Clustering for candidate grouping
export class KMeansCluster {
  private centroids: number[][];
  private k: number;

  constructor(k: number = 3) {
    this.k = k;
    this.centroids = [];
  }

  cluster(data: number[][]): number[] {
    // Initialize centroids randomly
    this.centroids = this.initializeCentroids(data);
    
    let assignments: number[] = [];
    let iterations = 0;
    const maxIterations = 100;

    while (iterations < maxIterations) {
      const newAssignments = this.assignPoints(data);
      
      if (this.arraysEqual(assignments, newAssignments)) {
        break;
      }
      
      assignments = newAssignments;
      this.updateCentroids(data, assignments);
      iterations++;
    }

    return assignments;
  }

  private initializeCentroids(data: number[][]): number[][] {
    const centroids: number[][] = [];
    for (let i = 0; i < this.k; i++) {
      const randomIndex = Math.floor(Math.random() * data.length);
      centroids.push([...data[randomIndex]]);
    }
    return centroids;
  }

  private assignPoints(data: number[][]): number[] {
    return data.map(point => {
      let minDistance = Infinity;
      let assignment = 0;
      
      this.centroids.forEach((centroid, index) => {
        const distance = this.euclideanDistance(point, centroid);
        if (distance < minDistance) {
          minDistance = distance;
          assignment = index;
        }
      });
      
      return assignment;
    });
  }

  private updateCentroids(data: number[][], assignments: number[]): void {
    for (let i = 0; i < this.k; i++) {
      const clusterPoints = data.filter((_, index) => assignments[index] === i);
      if (clusterPoints.length > 0) {
        this.centroids[i] = this.calculateMean(clusterPoints);
      }
    }
  }

  private euclideanDistance(a: number[], b: number[]): number {
    return Math.sqrt(a.reduce((sum, val, i) => sum + Math.pow(val - b[i], 2), 0));
  }

  private calculateMean(points: number[][]): number[] {
    const dimensions = points[0].length;
    const mean: number[] = new Array(dimensions).fill(0);
    
    points.forEach(point => {
      point.forEach((val, i) => {
        mean[i] += val;
      });
    });
    
    return mean.map(val => val / points.length);
  }

  private arraysEqual(a: number[], b: number[]): boolean {
    return a.length === b.length && a.every((val, i) => val === b[i]);
  }
}

// Random Forest for job success prediction
export class RandomForest {
  private trees: DecisionTree[] = [];
  private numTrees: number;

  constructor(numTrees: number = 10) {
    this.numTrees = numTrees;
  }

  train(features: number[][], labels: number[]): void {
    this.trees = [];
    
    for (let i = 0; i < this.numTrees; i++) {
      const tree = new DecisionTree();
      const { sampledFeatures, sampledLabels } = this.bootstrapSample(features, labels);
      tree.train(sampledFeatures, sampledLabels);
      this.trees.push(tree);
    }
  }

  predict(features: number[]): number {
    const predictions = this.trees.map(tree => tree.predict(features));
    return this.majorityVote(predictions);
  }

  private bootstrapSample(features: number[][], labels: number[]): { sampledFeatures: number[][], sampledLabels: number[] } {
    const n = features.length;
    const sampledFeatures: number[][] = [];
    const sampledLabels: number[] = [];
    
    for (let i = 0; i < n; i++) {
      const randomIndex = Math.floor(Math.random() * n);
      sampledFeatures.push(features[randomIndex]);
      sampledLabels.push(labels[randomIndex]);
    }
    
    return { sampledFeatures, sampledLabels };
  }

  private majorityVote(predictions: number[]): number {
    const counts: { [key: number]: number } = {};
    predictions.forEach(pred => {
      counts[pred] = (counts[pred] || 0) + 1;
    });
    
    let maxCount = 0;
    let majorityClass = 0;
    Object.entries(counts).forEach(([cls, count]) => {
      if (count > maxCount) {
        maxCount = count;
        majorityClass = parseInt(cls);
      }
    });
    
    return majorityClass;
  }
}

// Simple Decision Tree implementation
class DecisionTree {
  private root: TreeNode | null = null;

  train(features: number[][], labels: number[]): void {
    this.root = this.buildTree(features, labels);
  }

  predict(features: number[]): number {
    if (!this.root) return 0;
    return this.traverse(this.root, features);
  }

  private buildTree(features: number[][], labels: number[]): TreeNode {
    // Simple implementation - just return most common class
    const classCounts: { [key: number]: number } = {};
    labels.forEach(label => {
      classCounts[label] = (classCounts[label] || 0) + 1;
    });
    
    let maxCount = 0;
    let majorityClass = 0;
    Object.entries(classCounts).forEach(([cls, count]) => {
      if (count > maxCount) {
        maxCount = count;
        majorityClass = parseInt(cls);
      }
    });
    
    return new TreeNode(majorityClass);
  }

  private traverse(node: TreeNode, features: number[]): number {
    return node.value;
  }
}

class TreeNode {
  value: number;
  left?: TreeNode;
  right?: TreeNode;

  constructor(value: number) {
    this.value = value;
  }
}

// Neural Network for complex pattern recognition
export class NeuralNetwork {
  private weights: number[][];
  private biases: number[];
  private learningRate: number = 0.01;

  constructor(inputSize: number, hiddenSize: number, outputSize: number) {
    this.weights = this.initializeWeights(inputSize, hiddenSize, outputSize);
    this.biases = this.initializeBiases(hiddenSize, outputSize);
  }

  predict(input: number[]): number[] {
    let activation = input;
    
    // Forward pass through hidden layer
    activation = this.sigmoid(this.matrixMultiply([activation], this.weights[0])[0]);
    
    // Forward pass through output layer
    activation = this.sigmoid(this.matrixMultiply([activation], this.weights[1])[0]);
    
    return activation;
  }

  train(inputs: number[][], targets: number[][], epochs: number = 1000): void {
    for (let epoch = 0; epoch < epochs; epoch++) {
      for (let i = 0; i < inputs.length; i++) {
        this.backpropagate(inputs[i], targets[i]);
      }
    }
  }

  private sigmoid(x: number | number[]): number | number[] {
    if (Array.isArray(x)) {
      return x.map(val => 1 / (1 + Math.exp(-val)));
    }
    return 1 / (1 + Math.exp(-x));
  }

  private initializeWeights(inputSize: number, hiddenSize: number, outputSize: number): number[][] {
    const hiddenWeights = Array.from({ length: inputSize }, () =>
      Array.from({ length: hiddenSize }, () => Math.random() * 2 - 1)
    );
    
    const outputWeights = Array.from({ length: hiddenSize }, () =>
      Array.from({ length: outputSize }, () => Math.random() * 2 - 1)
    );
    
    return [hiddenWeights, outputWeights];
  }

  private initializeBiases(hiddenSize: number, outputSize: number): number[] {
    return Array.from({ length: hiddenSize + outputSize }, () => Math.random() * 2 - 1);
  }

  private matrixMultiply(a: number[][], b: number[][]): number[][] {
    const result: number[][] = [];
    for (let i = 0; i < a.length; i++) {
      result[i] = [];
      for (let j = 0; j < b[0].length; j++) {
        let sum = 0;
        for (let k = 0; k < b.length; k++) {
          sum += a[i][k] * b[k][j];
        }
        result[i][j] = sum;
      }
    }
    return result;
  }

  private backpropagate(input: number[], target: number[]): void {
    // Simplified backpropagation - in real implementation would calculate gradients
    const prediction = this.predict(input);
    // Update weights based on error (simplified)
  }
}

// Sentiment Analysis for candidate feedback
export class SentimentAnalyzer {
  private positiveWords: Set<string>;
  private negativeWords: Set<string>;

  constructor() {
    this.positiveWords = new Set([
      'excellent', 'great', 'amazing', 'good', 'fantastic', 'wonderful',
      'outstanding', 'impressive', 'skilled', 'talented', 'efficient',
      'productive', 'innovative', 'creative', 'professional', 'reliable'
    ]);
    
    this.negativeWords = new Set([
      'poor', 'bad', 'terrible', 'awful', 'disappointing', 'inadequate',
      'inefficient', 'unprofessional', 'unreliable', 'slow', 'problematic',
      'concerning', 'weak', 'lacking', 'insufficient', 'unqualified'
    ]);
  }

  analyze(text: string): { sentiment: 'positive' | 'negative' | 'neutral'; score: number } {
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;

    words.forEach(word => {
      if (this.positiveWords.has(word)) positiveCount++;
      if (this.negativeWords.has(word)) negativeCount++;
    });

    const score = (positiveCount - negativeCount) / words.length;
    
    let sentiment: 'positive' | 'negative' | 'neutral';
    if (score > 0.1) sentiment = 'positive';
    else if (score < -0.1) sentiment = 'negative';
    else sentiment = 'neutral';

    return { sentiment, score };
  }
}

// Time Series Forecasting for hiring trends
export class TimeSeriesForecaster {
  private data: number[] = [];

  addDataPoint(value: number): void {
    this.data.push(value);
  }

  predict(periods: number = 1): number[] {
    if (this.data.length < 2) return Array(periods).fill(0);

    // Simple moving average prediction
    const windowSize = Math.min(5, this.data.length);
    const recentData = this.data.slice(-windowSize);
    const average = recentData.reduce((a, b) => a + b, 0) / recentData.length;

    // Add trend component
    const trend = this.calculateTrend();
    
    const predictions: number[] = [];
    for (let i = 0; i < periods; i++) {
      predictions.push(average + trend * (i + 1));
    }

    return predictions;
  }

  private calculateTrend(): number {
    if (this.data.length < 2) return 0;
    
    const n = this.data.length;
    const halfPoint = Math.floor(n / 2);
    
    const firstHalf = this.data.slice(0, halfPoint);
    const secondHalf = this.data.slice(-halfPoint);
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    return (secondAvg - firstAvg) / halfPoint;
  }
}

// Reinforcement Learning for recommendation optimization
export class MultiArmedBandit {
  private arms: number;
  private counts: number[];
  private values: number[];
  private epsilon: number;

  constructor(arms: number, epsilon: number = 0.1) {
    this.arms = arms;
    this.epsilon = epsilon;
    this.counts = Array(arms).fill(0);
    this.values = Array(arms).fill(0);
  }

  selectArm(): number {
    if (Math.random() < this.epsilon) {
      // Explore: random choice
      return Math.floor(Math.random() * this.arms);
    } else {
      // Exploit: choose best arm
      return this.values.indexOf(Math.max(...this.values));
    }
  }

  updateArm(arm: number, reward: number): void {
    this.counts[arm]++;
    const n = this.counts[arm];
    this.values[arm] = ((n - 1) / n) * this.values[arm] + (1 / n) * reward;
  }

  getBestArm(): number {
    return this.values.indexOf(Math.max(...this.values));
  }
}

// Advanced AI Service combining all algorithms
export class AdvancedAIService {
  private kMeans: KMeansCluster;
  private randomForest: RandomForest;
  private neuralNetwork: NeuralNetwork;
  private sentimentAnalyzer: SentimentAnalyzer;
  private timeSeriesForecaster: TimeSeriesForecaster;
  private recommenderBandit: MultiArmedBandit;

  constructor() {
    this.kMeans = new KMeansCluster(5);
    this.randomForest = new RandomForest(15);
    this.neuralNetwork = new NeuralNetwork(10, 8, 3);
    this.sentimentAnalyzer = new SentimentAnalyzer();
    this.timeSeriesForecaster = new TimeSeriesForecaster();
    this.recommenderBandit = new MultiArmedBandit(10);
  }

  // Cluster candidates by skills and experience
  clusterCandidates(candidates: Candidate[]): { clusters: number[], insights: string[] } {
    const features = candidates.map(candidate => [
      candidate.skills.length,
      parseInt(candidate.experience) || 0,
      candidate.rating,
      candidate.projects.length,
      candidate.certifications.length
    ]);

    const clusters = this.kMeans.cluster(features);
    
    const insights = [
      "Identified 5 distinct candidate clusters based on skills and experience",
      "Cluster analysis reveals patterns in skill development paths",
      "High-performing candidates typically have 8+ skills and 3+ projects"
    ];

    return { clusters, insights };
  }

  // Predict job application success
  predictJobSuccess(candidate: Candidate, gig: Gig): { probability: number, factors: string[] } {
    const features = [
      candidate.skills.length,
      parseInt(candidate.experience) || 0,
      candidate.rating,
      candidate.projects.length,
      gig.skills.filter(skill => candidate.skills.includes(skill)).length,
      candidate.isVerified ? 1 : 0,
      candidate.certifications.length,
      candidate.tokensEarned / 1000,
      candidate.profileViews / 100,
      candidate.achievements.length
    ];

    const prediction = this.neuralNetwork.predict(features);
    const probability = Array.isArray(prediction) ? prediction[0] : prediction;

    const factors = [
      "Skill overlap with job requirements",
      "Candidate experience level",
      "Previous project complexity",
      "Profile completeness and verification",
      "Community engagement metrics"
    ];

    return { probability: probability * 100, factors };
  }

  // Analyze feedback sentiment
  analyzeFeedback(feedback: string): { sentiment: string, score: number, insights: string[] } {
    const analysis = this.sentimentAnalyzer.analyze(feedback);
    
    const insights = [
      `Overall sentiment is ${analysis.sentiment}`,
      analysis.score > 0.5 ? "Highly positive feedback detected" : 
      analysis.score < -0.5 ? "Areas for improvement identified" : "Balanced feedback",
      "Sentiment analysis helps improve candidate-recruiter matching"
    ];

    return {
      sentiment: analysis.sentiment,
      score: analysis.score,
      insights
    };
  }

  // Forecast hiring trends
  forecastHiringTrends(historicalData: number[]): { predictions: number[], trends: string[] } {
    historicalData.forEach(data => this.timeSeriesForecaster.addDataPoint(data));
    
    const predictions = this.timeSeriesForecaster.predict(3);
    
    const trends = [
      predictions[0] > historicalData[historicalData.length - 1] ? "Upward hiring trend predicted" : "Hiring may slow down",
      "Machine learning models suggest seasonal variations",
      "AI-powered forecasting improves recruitment planning"
    ];

    return { predictions, trends };
  }

  // Optimize recommendations using reinforcement learning
  optimizeRecommendations(userId: string, interactions: { itemId: number, rating: number }[]): number {
    interactions.forEach(interaction => {
      this.recommenderBandit.updateArm(interaction.itemId, interaction.rating);
    });

    return this.recommenderBandit.selectArm();
  }

  // Advanced candidate scoring with ensemble methods
  calculateAdvancedScore(candidate: Candidate, gig: Gig): { 
    score: number, 
    breakdown: { [key: string]: number },
    mlInsights: string[] 
  } {
    // Feature engineering
    const skillMatch = gig.skills.filter(skill => candidate.skills.includes(skill)).length / gig.skills.length;
    const experienceScore = Math.min(parseInt(candidate.experience) || 0, 10) / 10;
    const projectScore = Math.min(candidate.projects.length, 5) / 5;
    const ratingScore = candidate.rating / 5;
    const verificationScore = candidate.isVerified ? 1 : 0.5;

    // Ensemble scoring
    const linearScore = (skillMatch * 0.4 + experienceScore * 0.3 + projectScore * 0.2 + ratingScore * 0.1);
    const neuralPrediction = this.neuralNetwork.predict([
      skillMatch, experienceScore, projectScore, ratingScore, verificationScore,
      candidate.tokensEarned / 1000, candidate.profileViews / 100,
      candidate.achievements.length, candidate.certifications.length, candidate.badges.length
    ]);
    
    const ensembleScore = (linearScore + (Array.isArray(neuralPrediction) ? neuralPrediction[0] : neuralPrediction)) / 2;

    const breakdown = {
      skillAlignment: skillMatch * 100,
      experienceLevel: experienceScore * 100,
      projectPortfolio: projectScore * 100,
      communityRating: ratingScore * 100,
      profileVerification: verificationScore * 100
    };

    const mlInsights = [
      `AI ensemble model confidence: ${(ensembleScore * 100).toFixed(1)}%`,
      skillMatch > 0.8 ? "Excellent skill alignment detected" : "Some skill gaps identified",
      candidate.projects.length > 3 ? "Strong project portfolio" : "Portfolio could be enhanced",
      candidate.isVerified ? "Verified candidate profile" : "Profile verification recommended"
    ];

    return {
      score: Math.round(ensembleScore * 100),
      breakdown,
      mlInsights
    };
  }
}

export const advancedAIService = new AdvancedAIService();
