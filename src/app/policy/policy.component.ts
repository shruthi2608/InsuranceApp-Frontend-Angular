import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardsService } from '../service/cards.service';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css'],
  animations: [
    trigger('slideAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('500ms ease', style({ transform: 'translateY(0%)' }))
      ]),
      transition(':leave', [
        animate('500ms ease', style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class PolicyComponent implements OnInit {
  policies: any[] = [];
  
  policyInfoMapping: { [key: string]: string } = {
    'Health Insurance': 'Covers medical expenses, including doctor visits, hospital stays, prescription drugs, and preventive care.',
    'Dental Insurance': 'Provides coverage for dental care, including routine check-ups, cleanings, fillings, and major dental procedures.',
    'Vision Insurance': 'Covers vision care expenses such as eye exams, prescription eyewear (glasses or contacts), and corrective procedures like LASIK.',
    'Life Insurance': 'Offers financial protection to employees\' beneficiaries in case of death. It may provide a lump-sum payment or ongoing income to the family.',
    'Disability Insurance': 'Provides income replacement if an employee becomes unable to work due to illness or injury that is not work-related (short-term or long-term disability).',
    'Accidental Death and Dismemberment (AD&D) Insurance': 'Pays out a benefit in case of accidental death or serious injury resulting in loss of limbs, sight, or hearing.',
    'Critical Illness Insurance': 'Offers a lump-sum payment if an employee is diagnosed with a covered critical illness such as cancer, heart attack, or stroke.',
    'Long-Term Care Insurance': 'Covers expenses associated with long-term care services needed due to aging, chronic illness, or disability, either in a nursing home or at home.',
    'Travel Insurance': 'Provides coverage for employees traveling for work-related purposes, including medical emergencies, trip cancellation, lost baggage, and more.',
    'Employee Assistance Programs (EAP)': 'Offers counseling and support services to employees for various personal and work-related issues, including mental health, financial advice, and legal assistance.'
   
  };

 
  policyTypes: string[] = Object.keys(this.policyInfoMapping);
  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private router:Router
  ) { }

  navigateToCards(): void {
    this.router.navigate(['/cards']);
  }
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const loginId = params['loginId'];
      if (loginId) {
        this.cardsService.getPoliciesByLoginId(loginId).subscribe(
          (policies: any[]) => {
            this.policies = policies;
            
          },
          error => {
            console.error('Error occurred while retrieving policies:', error);
          }
        );
      }
    });
  }

  isFirstPolicyForUser(policy: any): boolean {
    const index = this.policies.findIndex(p => p.loginId === policy.loginId && p.username === policy.username);
    return index !== -1 && this.policies[index] === policy;
  }

  getPolicyInfo(policyName: string): string {
    return this.policyInfoMapping[policyName] || 'Information not available';
  }
}
