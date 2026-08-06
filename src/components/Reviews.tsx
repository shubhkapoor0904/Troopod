import { useState } from 'react';
import { Star, Check, ChevronDown } from 'lucide-react';
import { Review } from '../types';

interface ReviewsProps {
  reviews: Review[];
  averageRating: string;
  totalReviews: number;
  getPercent: (stars: 1 | 2 | 3 | 4 | 5) => number;
  onSubmitReview: (name: string, title: string, text: string, rating: number) => void;
}

export default function Reviews({
  reviews,
  averageRating,
  totalReviews,
  getPercent,
  onSubmitReview,
}: ReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  
  // Form states
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewTitle.trim() || !newReviewText.trim()) {
      setFormError('Please fill out all fields.');
      return;
    }

    onSubmitReview(
      newReviewName.trim(),
      newReviewTitle.trim(),
      newReviewText.trim(),
      newReviewRating
    );

    // Reset form states
    setNewReviewName('');
    setNewReviewTitle('');
    setNewReviewText('');
    setNewReviewRating(5);
    setFormError('');
    
    setShowReviewForm(false);
    setReviewSubmitted(true);

    // Reset submission banner
    setTimeout(() => {
      setReviewSubmitted(false);
    }, 4000);
  };

  return (
    <section id="reviews" className="py-20 px-4 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center md:items-start mb-16">
          <div className="md:w-1/3 text-center md:text-left">
            <h2 className="font-serif text-3xl md:text-4xl font-medium text-primary mb-4">Real Results</h2>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-bold text-2xl">{averageRating}</span>
            </div>
            <p className="text-muted-foreground text-sm">Based on {totalReviews.toLocaleString()} verified reviews</p>
            {!showReviewForm && !reviewSubmitted ? (
              <button 
                onClick={() => setShowReviewForm(true)}
                className="mt-6 border-2 border-primary text-primary font-bold px-6 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors cursor-pointer"
              >
                Write a Review
              </button>
            ) : reviewSubmitted ? (
              <div className="mt-6 text-green-600 font-bold flex items-center justify-center md:justify-start gap-2 animate-in fade-in">
                <Check className="w-5 h-5" /> Review submitted!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 text-left bg-white p-6 rounded-2xl border border-border shadow-sm animate-in fade-in slide-in-from-top-4">
                <div className="mb-4">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-2 text-foreground">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(null)}
                        className="focus:outline-none cursor-pointer transition-transform active:scale-95"
                      >
                        <Star 
                          className={`w-6 h-6 transition-colors ${
                            star <= (hoveredRating !== null ? hoveredRating : newReviewRating)
                              ? 'fill-amber-400 text-amber-400' 
                              : 'text-muted-foreground/30 hover:text-amber-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Name</label>
                  <input 
                    type="text"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    placeholder="Your Name (e.g. Jane D.)"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Title</label>
                  <input 
                    type="text"
                    value={newReviewTitle}
                    onChange={(e) => setNewReviewTitle(e.target.value)}
                    className="w-full border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" 
                    placeholder="Headline (e.g. Life changing!)"
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-foreground">Review</label>
                  <textarea 
                    value={newReviewText}
                    onChange={(e) => setNewReviewText(e.target.value)}
                    className="w-full border border-border rounded-xl p-3 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none" 
                    rows={3} 
                    placeholder="What did you think of the product?"
                  />
                </div>

                {formError && (
                  <p className="text-red-500 text-xs font-medium mb-3">{formError}</p>
                )}

                <div className="flex gap-2">
                  <button 
                    type="submit"
                    className="bg-primary text-white px-4 py-2 rounded-xl font-bold text-sm hover:bg-primary/90 transition-colors cursor-pointer"
                  >
                    Submit
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setShowReviewForm(false);
                      setFormError('');
                      setNewReviewName('');
                      setNewReviewTitle('');
                      setNewReviewText('');
                      setNewReviewRating(5);
                    }} 
                    className="text-muted-foreground px-4 py-2 text-sm font-medium hover:text-foreground transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
          
          <div className="md:w-2/3 w-full">
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => {
                const percent = getPercent(stars as 1 | 2 | 3 | 4 | 5);
                return (
                  <div key={stars} className="flex items-center gap-4 text-sm">
                    <span className="w-12 flex items-center gap-1 font-medium">{stars} <Star className="w-3 h-3 fill-amber-400 text-amber-400" /></span>
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-amber-400 rounded-full" style={{ width: `${percent}%` }} />
                    </div>
                    <span className="w-10 text-right text-muted-foreground">{percent}%</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Display exactly 3 reviews at a time */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.slice(0, 3).map((review, i) => (
            <div key={`${review.name}-${review.date}-${i}`} className="bg-white p-8 rounded-2xl shadow-sm border border-border/50 flex flex-col justify-between animate-slide-in-fade">
              <div>
                <div className="flex mb-4 gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star 
                      key={idx} 
                      className={`h-4 w-4 ${idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/20'}`} 
                    />
                  ))}
                </div>
                <h4 className="font-bold text-lg mb-2">{review.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">"{review.text}"</p>
              </div>
              <div className="flex justify-between items-center mt-auto border-t border-secondary pt-4">
                <p className="font-medium text-sm text-primary flex items-center gap-2">
                  {review.name} 
                  {review.verified && (
                    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">Verified Buyer</span>
                  )}
                </p>
                {review.date && (
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-primary font-bold hover:underline underline-offset-4 flex items-center justify-center gap-2 mx-auto cursor-pointer">
            Load More Reviews <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
